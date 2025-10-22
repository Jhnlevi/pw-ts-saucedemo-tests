FROM mcr.microsoft.com/playwright:v1.56.1-jammy 
WORKDIR /src 
RUN npm install -g pnpm 
COPY package.json pnpm-lock.yaml ./ 
RUN pnpm install --frozen-lockfile 
COPY . . 
RUN pnpm store prune && pnpm store gc && pnpm cache clean && rm -rf /root/.pnpm-store/tmp /var/lib/apt/lists/* 
CMD ["node", "-r", "tsconfig-paths/register", "node_modules/.bin/playwright", "test"]