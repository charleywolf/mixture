# Mixture

This is an example of a mixture of agents, a web application which allows you to pick and choose different AI models and combine them into one, unique response.

## Examples

<div style="display: flex">
  <img src="https://github.com/charleywolf/mixture/assets/41237443/24a17791-6db6-451f-a9ca-3e98ae166e4f" height="600" alt="Mixture Settings Example on iPad Air"/>&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/charleywolf/mixture/assets/41237443/e7e7e6f0-d2cf-4bbf-a05d-e3af0ba7fbf3" height="600" alt="Mixture Chat Example on iPad Air"/>&nbsp;&nbsp;&nbsp;&nbsp;
</div>

## Features
- Sleek and modern chat interface with automatic scrolling to the latest message, real-time status updates, and a visually appealing design.
- Saving chats to a Postgres database with Prisma
- Weighting of models via percentage sliders to apply to the end result (ex: 30% GPT 4o, 20% GPT 4 Turbo, 50% Claude 3 Opus)
- 4 different models to choose from: GPT 4o, GPT 4 Turbo, Claude 3 Opus, Claude 3 Sonnet
  - Additionally, with minimal code you can modify the models used.
