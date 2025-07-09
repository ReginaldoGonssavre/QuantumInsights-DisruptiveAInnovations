from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional
import sqlite3
import bcrypt

app = FastAPI(
    title="Quantum Insights Platform API",
    description="API para autenticação de usuários e acesso a conteúdo quântico.",
    version="0.1.0",
)

# --- Database Setup ---
DATABASE_URL = "quantum_insights.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            hashed_password TEXT NOT NULL,
            license_type TEXT DEFAULT 'free'
        );
    """)
    conn.commit()
    conn.close()

# Create tables on startup
@app.on_event("startup")
async def startup_event():
    create_tables()

# --- Models ---
class UserCreate(BaseModel):
    email: str
    password: str

class UserInDB(BaseModel):
    id: int
    email: str
    hashed_password: str
    license_type: str

class Token(BaseModel):
    access_token: str
    token_type: str

# --- Authentication ---
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_user(email: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user_data = cursor.fetchone()
    conn.close()
    if user_data:
        return UserInDB(**user_data)
    return None

def verify_password(plain_password: str, hashed_password: str):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

async def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

async def get_current_user(token: str = Depends(oauth2_scheme)):
    # For simplicity, we're not implementing JWTs here.
    # In a real app, this token would be a JWT that you decode and verify.
    # For this prototype, we'll just assume the token is the user's email for testing.
    user = get_user(token) # Assuming token is email for this simple prototype
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

# --- Endpoints ---

@app.post("/register", response_model=Token)
async def register_user(user: UserCreate):
    existing_user = get_user(user.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (email, hashed_password) VALUES (?, ?)", (user.email, hashed_password))
        conn.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    finally:
        conn.close()

    # For simplicity, return email as token for now
    return {"access_token": user.email, "token_type": "bearer"}

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # For simplicity, return email as token for now
    return {"access_token": user.email, "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(current_user: UserInDB = Depends(get_current_user)):
    return {"email": current_user.email, "license_type": current_user.license_type}

@app.get("/content/free")
async def get_free_content():
    return {"message": "Este é um conteúdo gratuito disponível para todos."}

@app.get("/content/premium")
async def get_premium_content(current_user: UserInDB = Depends(get_current_user)):
    if current_user.license_type != 'premium':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso premium necessário.")
    return {"message": f"Bem-vindo, {current_user.email}! Este é um conteúdo premium exclusivo."}

@app.post("/upgrade_license")
async def upgrade_license(current_user: UserInDB = Depends(get_current_user)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET license_type = 'premium' WHERE id = ?", (current_user.id,))
    conn.commit()
    conn.close()
    return {"message": f"Licença do usuário {current_user.email} atualizada para premium."}
