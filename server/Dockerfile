# Base image
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND pnpm-lock.yaml are copied
COPY package*.json pnpm-lock.yaml ./

# Install app dependencies using pnpm
RUN pnpm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN pnpm run build

# Set the environment variable
ENV PORT=3000

# Start the server using the production build and pass the PORT environment variable
CMD ["node", "dist/main.js"]
