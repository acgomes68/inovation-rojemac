# Define source image
FROM node:13.12.0-alpine

# Information about building
LABEL maintainer = "Antonio Carlos Gomes <acgomes68@gmail.com>"
LABEL description = "Alpine Linux with Node.js, ReacJS and project dependencies"

# Define work directory
WORKDIR /usr/app

# Copy all files from project to container work directory
COPY . .

# Add `/usr/app/node_modules/.bin` to the $PATH
ENV PATH /usr/app/node_modules/.bin:$PATH

# 1.Update system packages repositories
# 2.Update required system packages
# 3.Clean cache after in order to keep small image
# 4.Install dependencies
RUN apk update && \
    apk upgrade && \
    rm -rf /var/cache/apk/* && \
    npm install

# Expose container port 3000
EXPOSE 3000

# Run npm start command (scripts>start in package.json)
CMD ["npm", "start"]
