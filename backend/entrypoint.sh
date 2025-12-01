#!/usr/bin/env bash
set -e

# Simple wait-for function
wait_for() {
  local host_port=$1
  local retries=30
  local wait=2
  until nc -z ${host_port%%:*} ${host_port##*:}; do
    retries=$((retries-1))
    if [ $retries -le 0 ]; then
      echo "Timed out waiting for $host_port"
      exit 1
    fi
    echo "Waiting for $host_port..."
    sleep $wait
  done
}

# Wait for Postgres and Redis if configured
if [ -n "$DATABASE_HOST" ] && [ -n "$DATABASE_PORT" ]; then
  wait_for "$DATABASE_HOST:$DATABASE_PORT"
fi
if [ -n "$REDIS_HOST" ] && [ -n "$REDIS_PORT" ]; then
  wait_for "$REDIS_HOST:$REDIS_PORT"
fi

# Apply migrations
echo "Running migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static..."
python manage.py collectstatic --noinput

# Create superuser if env vars provided (safe: only if not exists)
if [ -n "$DJANGO_SUPERUSER_EMAIL" ] && [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
  python manage.py createsuperuser --noinput --email "$DJANGO_SUPERUSER_EMAIL" || true
fi

# Start Gunicorn or passed CMD
exec "$@"
