# Java Game Engine
**Author: William Bigert**

**Skills: Java, Java Foundation Libraries (AWT and Swing)**

A 2D game engine that I built during the summer of 2020 with the sole purpose of improving my Java skills.

## Demo: Gameplay
https://user-images.githubusercontent.com/60448436/226497466-596a50e6-ec89-4585-8d30-6dcea4af9a8d.mp4

## Demo: Editor
https://user-images.githubusercontent.com/60448436/226497491-9e213739-9352-47b9-a535-66ce0c045c19.mp4

## Features

#### Levels
- Levels are built by parsing pixels of PNG images. Each pixel's RGB value will be matched with a block of a certain spritesheet and will be rendered on the screen.
- There are 3 layers of a level, each with their own PNG image. These 3 layers represent the background, interactible layer, and foreground.

#### Level editing
- There is a level editor that you can use to create levels. You can switch between available blocks and layers of a level and place them as you see fit. When saved, the editor will convert your level into new PNG images.

#### Rendering
- Efficient rendering where only blocks that would appear in your game window are rendered.

#### Camera
- A smooth camera that follows your character around with some deadzone for a better experience.
- A variable zoom where the user can scroll to zoom in and out. All blocks and pixels will be scaled accordingly.

#### Collisions
- Smooth collision detection, with support for slopes.
- Variable height jumping (depending on how long spacebar is held down)

#### Action
- The character can throw a coffin which will attach itself to a wall if thrown hard enough. This coffin has it's own collision detection and can be used as a platform.   

#### Animations
- Character running animation (sprite sheet by Marcus Gisslén)
- Thrown Coffin animations (sprite sheet by Marcus Gisslén)
- All other textures and block sprites were obtained from websites providing free game sprite sheets

## Credits
When making this game, I initially followed several different tutorials to get started which inspired some parts of the code such as the way I create the game thread and the way the [game-loop is structured](https://www.youtube.com/watch?v=ec5BMsJxcdY) with the separation of UPS and FPS. The structure of my game states was also inspired by another developer's Java Game which i studied, but is not available anymore. However, these parts make up a very small portion of the overall code, but was worth mentioning either way!


