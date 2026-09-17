from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "GoalUp API"
    env: str = "development"
    log_level: str = "INFO"

    database_url: str = "postgresql+psycopg://goalup:goalup@localhost:5432/goalup"

    frontend_url: str = "http://localhost:3000"
    trusted_origins: str = "http://localhost:3000"

    # Auth (Этап 2)
    secret_key: str = "change-me"
    auth_cookie_name: str = "goalup_session"
    auth_cookie_secure: bool = False
    auth_cookie_domain: str | None = None
    access_token_expire_hours: int = 168

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.trusted_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
