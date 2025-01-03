cd /root/HexCode-Deploy

# Stop and remove containers and images related to the current docker-compose setup (without removing volumes)
docker compose down --rmi all --remove-orphans

# Rebuild and restart containers
docker compose up -d
