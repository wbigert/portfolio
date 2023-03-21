# Java Game Engine
**Author: William Bigert**

**Skills: Java, Java Foundation Libraries (AWT and Swing)**

A 2D game engine that I built during the summer of 2020 with the sole purpose of improving my Java skills.

## Gameplay Demo
https://user-images.githubusercontent.com/60448436/226496002-a443f061-1a3c-44cb-a44d-f188a20329ae.mp4

## Editor Demo
https://user-images.githubusercontent.com/60448436/226495976-bc67ab89-1af5-4e3a-a474-a55b4d11f6c3.mp4

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



