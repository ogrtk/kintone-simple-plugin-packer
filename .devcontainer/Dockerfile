FROM "mcr.microsoft.com/devcontainers/base:bullseye"

SHELL ["/bin/bash", "-c"]

RUN apt-get update
RUN apt-get install curl gnupg2 -y

# Nodeインストール
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
  apt-get install -y nodejs

# TypeScriptインストール
RUN npm install -g typescript

USER vscode
