cd /root/HexCode-Deploy

# Stop and remove all containers related to the current docker-compose setup
docker compose down --rmi all --volumes --remove-orphans

# Rebuild and restart containers
docker compose up -d
