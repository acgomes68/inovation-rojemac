# Define source image
FROM acgomes68/alpine-node:latest

# Show information about building
LABEL maintainer = "Antonio Carlos Gomes <acgomes68@gmail.com>"
LABEL description = "Alpine Linux with Node.js, React, Typescript and project dependencies"

# Define work directory
WORKDIR /home/node/app

# Copy dependencies files
COPY package.json yarn.* ./

# Define app user
USER node

# Install and update app dependencies
RUN yarn

# Copy from project files to container with app user permissions
COPY --chown=node:node . .

# Add `/usr/app/node_modules/.bin` to the $PATH
# ENV PATH /home/node/app/node_modules/.bin:$PATH

# Expose container port 3333
EXPOSE 3333

# Run npm start command (scripts>start in package.json)
CMD ["yarn", "start"]
