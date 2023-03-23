package handlers;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

import javax.imageio.ImageIO;

import animation.Animation;
import audio.AudioPlayer;
import sprite.SpriteSheet;

public class MediaLoader {
	private HashMap<String, SpriteSheet> sheets = new HashMap<>();
	private HashMap<String, BufferedImage> images = new HashMap<>();
	private HashMap<String, BufferedImage[]> levels = new HashMap<>();
	private HashMap<String, BufferedImage> textures = new HashMap<>();
	private HashMap<String, Integer> colorMap = new HashMap<>();
	private HashMap<String, Animation> animations = new HashMap<>();
	private HashMap<String, Animation> playerAnimations = new HashMap<>();
	private HashMap<String, Animation> enemyAnimations = new HashMap<>();
	private HashMap<String, ArrayList<String>[]> menuOptions = new HashMap<>();
	private HashMap<String, BufferedImage> editorOuterTextures = new HashMap<>();
	private HashMap<String, BufferedImage> editorMiddleTextures = new HashMap<>();

	public MediaLoader() {
		initializeSheets();
		initializeTextures();
		initializeImages();
		initializeColorMap();
		initializeOptions();
		initializeLevels();
		initializePlayerAnimations();
//		initializeEnemyAnimations();
	}

	private void initializeSheets() {
		sheets.put("tileSet1", new SpriteSheet("./res/tileSets/tileSet1.png", 16));
		sheets.put("tileSet2", new SpriteSheet("./res/tileSets/tileSet2.png", 16));
		sheets.put("tileSet3", new SpriteSheet("./res/tileSets/tileSet3.png", 16));
		sheets.put("tileSet4", new SpriteSheet("./res/tileSets/tileSet4.png", 16));
		sheets.put("playerSheet", new SpriteSheet("./res/tileSets/player.png", 64));
		sheets.put("coffinSheet", new SpriteSheet("./res/tileSets/coffin.png", 64));

	}

	private void initializeImages() {
		try {
			images.put("mainMenuBackground", ImageIO.read(new File("./res/images/mainMenuBackground.png")));
			images.put("menuButton", ImageIO.read(new File("./res/images/menuButton.png")));
			images.put("attatchedCoffinRight", ImageIO.read(new File("./res/images/attatchedCoffinRight.png")));
			images.put("attatchedCoffinLeft", ImageIO.read(new File("./res/images/attatchedCoffinLeft.png")));

			BufferedImage image = new BufferedImage(1920, 1080, BufferedImage.TYPE_INT_ARGB);
			for (int x = 0; x < 1920; x++) {
				for (int y = 0; y < 1080; y++) {
					image.setRGB(x, y, (Color.gray.getRGB()));
				}
			}

			images.put("menuShade", image);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@SuppressWarnings("unchecked")
	private void initializeOptions() {
		ArrayList<String>[] mainMenu = new ArrayList[4];
		ArrayList<String>[] editorMenu = new ArrayList[4];
		ArrayList<String>[] playingMenu = new ArrayList[4];
		for (int i = 0; i < mainMenu.length; i++) {
			mainMenu[i] = new ArrayList<String>();
		}
		for (int i = 0; i < editorMenu.length; i++) {
			editorMenu[i] = new ArrayList<String>();
		}
		for (int i = 0; i < playingMenu.length; i++) {
			playingMenu[i] = new ArrayList<String>();
		}

		mainMenu[0].add("Start");
		mainMenu[0].add("Options");
		mainMenu[0].add("Editor");
		mainMenu[0].add("Quit");
		mainMenu[1].add("Back");
		mainMenu[1].add("Volume");
		mainMenu[1].add("FPS");
		mainMenu[2].add("Back");
		mainMenu[2].add("Volume:          ");
		mainMenu[3].add("Back");
		mainMenu[3].add("30 FPS");
		mainMenu[3].add("60 FPS");
		mainMenu[3].add("144 FPS");
		mainMenu[3].add("Unlimited FPS");

		editorMenu[0].add("Resume");
		editorMenu[0].add("Save");
		editorMenu[0].add("Options");
		editorMenu[0].add("Main Menu");
		editorMenu[0].add("Quit");
		editorMenu[1].add("Back");
		editorMenu[1].add("Volume");
		editorMenu[1].add("FPS");
		editorMenu[2].add("Back");
		editorMenu[2].add("Volume:          ");
		editorMenu[3].add("Back");
		editorMenu[3].add("30 FPS");
		editorMenu[3].add("60 FPS");
		editorMenu[3].add("144 FPS");
		editorMenu[3].add("Unlimited FPS");

		playingMenu[0].add("Resume");
		playingMenu[0].add("Restart");
		playingMenu[0].add("Options");
		playingMenu[0].add("Main Menu");
		playingMenu[0].add("Quit");
		playingMenu[1].add("Back");
		playingMenu[1].add("Volume");
		playingMenu[1].add("FPS");
		playingMenu[2].add("Back");
		playingMenu[2].add("Volume:          ");
		playingMenu[3].add("Back");
		playingMenu[3].add("30 FPS");
		playingMenu[3].add("60 FPS");
		playingMenu[3].add("144 FPS");
		playingMenu[3].add("Unlimited FPS");
		menuOptions.put("MAINMENU", mainMenu);
		menuOptions.put("EDITOR", editorMenu);
		menuOptions.put("PLAYING", playingMenu);

	}

	private void initializeColorMap() {
		colorMap.put("set3Brick1", (new Color(0, 0, 5)).getRGB());
		colorMap.put("set3Crate1", (new Color(0, 0, 40)).getRGB());
		colorMap.put("set3CBrick1", (new Color(0, 0, 45)).getRGB());
		colorMap.put("set3PStair1", (new Color(0, 0, 50)).getRGB());
		colorMap.put("set3PStair2", (new Color(0, 0, 55)).getRGB());
		colorMap.put("player", (new Color(0, 0, 255).getRGB()));
	}

	private void initializePlayerAnimations() {
		BufferedImage[] walkingLeft = new BufferedImage[] { textures.get("playerWalkingLeft1"),
				textures.get("playerWalkingLeft2"), textures.get("playerWalkingLeft3"),
				textures.get("playerWalkingLeft4"), textures.get("playerWalkingLeft5"),
				textures.get("playerWalkingLeft6"), textures.get("playerWalkingLeft7"),
				textures.get("playerWalkingLeft8") };

		BufferedImage[] walkingRight = new BufferedImage[] { textures.get("playerWalkingRight1"),
				textures.get("playerWalkingRight2"), textures.get("playerWalkingRight3"),
				textures.get("playerWalkingRight4"), textures.get("playerWalkingRight5"),
				textures.get("playerWalkingRight6"), textures.get("playerWalkingRight7"),
				textures.get("playerWalkingRight8") };

		BufferedImage[] jumpingLeft = new BufferedImage[] { textures.get("playerJumpingLeft1"),
				textures.get("playerJumpingLeft2"), textures.get("playerJumpingLeft3") };

		BufferedImage[] jumpingRight = new BufferedImage[] { textures.get("playerJumpingRight1"),
				textures.get("playerJumpingRight2"), textures.get("playerJumpingRight3") };

		BufferedImage[] standingRight = new BufferedImage[] { textures.get("playerStandingRight1"),
				textures.get("playerStandingRight2"), textures.get("playerStandingRight3"),
				textures.get("playerStandingRight4") };

		BufferedImage[] standingLeft = new BufferedImage[] { textures.get("playerStandingLeft1"),
				textures.get("playerStandingLeft2"), textures.get("playerStandingLeft3"),
				textures.get("playerStandingLeft4") };

		BufferedImage[] coffinRight = new BufferedImage[] { textures.get("coffinRight1"), textures.get("coffinRight2"),
				textures.get("coffinRight3"), textures.get("coffinRight4"), textures.get("coffinRight5"),
				textures.get("coffinRight6"), textures.get("coffinRight7") };

		BufferedImage[] coffinLeft = new BufferedImage[] { textures.get("coffinLeft1"), textures.get("coffinLeft2"),
				textures.get("coffinLeft3"), textures.get("coffinLeft4"), textures.get("coffinLeft5"),
				textures.get("coffinLeft6"), textures.get("coffinLeft7") };

		playerAnimations.put("walkLeft", new Animation(walkingLeft, 8));
		playerAnimations.put("walkRight", new Animation(walkingRight, 8));
		playerAnimations.put("jumpLeft", new Animation(jumpingLeft));
		playerAnimations.put("jumpRight", new Animation(jumpingRight));
		playerAnimations.put("standRight", new Animation(standingRight, 16));
		playerAnimations.put("standLeft", new Animation(standingLeft, 16));
		animations.put("coffinRight", new Animation(coffinRight));
		animations.put("coffinLeft", new Animation(coffinLeft));
	}

	public void initializeLevels() {
		try {
			BufferedImage[] test = new BufferedImage[3];
			test[0] = ImageIO.read(new File("./res/levels/test/testLayer1.png"));
			test[1] = ImageIO.read(new File("./res/levels/test/testLayer2.png"));
			test[2] = ImageIO.read(new File("./res/levels/test/testLayer3.png"));
			levels.put("test", test);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private void initializeTextures() {
		SpriteSheet sheet = sheets.get("tileSet3");

		textures.put("set3CBrick1", sheet.getSprite(7, 1));
		textures.put("set3Brick1", sheet.getSprite(1, 1));
		textures.put("set3Crate1", sheet.getSprite(7, 4));
		textures.put("set3PStair1", sheet.getSprite(6, 2));
		textures.put("set3PStair2", sheet.getSprite(7, 2));

		editorOuterTextures.put("set3CBrick1", sheet.getSprite(7, 1));
		editorMiddleTextures.put("set3Brick1", sheet.getSprite(1, 1));
		editorMiddleTextures.put("set3Crate1", sheet.getSprite(7, 4));
		editorMiddleTextures.put("set3PStair1", sheet.getSprite(6, 2));
		editorMiddleTextures.put("set3PStair2", sheet.getSprite(7, 2));

		sheet = sheets.get("playerSheet");
		textures.put("player", sheet.getSprite(1, 1));
		editorMiddleTextures.put("player", sheet.getSprite(1, 1));
		for (int i = 1; i <= 8; i++) {
			textures.put("playerWalkingLeft" + i, sheet.getSprite(9 - i, 6));
			textures.put("playerWalkingRight" + i, sheet.getSprite(i, 2));
		}
		for (int i = 1; i <= 4; i++) {
			textures.put("playerJumpingLeft" + i, sheet.getSprite(9 - i, 8));
			textures.put("playerJumpingRight" + i, sheet.getSprite(i, 4));
			textures.put("playerStandingRight" + i, sheet.getSprite(i, 1));
			textures.put("playerStandingLeft" + i, sheet.getSprite(9 - i, 5));
		}

		sheet = sheets.get("coffinSheet");
		for (int i = 1; i <= 7; i++) {
			textures.put("coffinRight" + i, sheet.getSprite(i, 1));
			textures.put("coffinLeft" + i, sheet.getSprite(8 - i, 2));
		}

	}

	public void load(int gameState, AudioPlayer audioPlayer) {
		switch (gameState) {
		case 0:
			audioPlayer.load("./res/audio/menuChange.wav", "menuChange");
			audioPlayer.load("./res/audio/menuSelect.wav", "menuSelect");
			audioPlayer.load("./res/audio/AstronomiaSynth.mp3", "menuMusic");
			audioPlayer.setVolume(0.3f);
			audioPlayer.setVolumeLevel(3);
			audioPlayer.loop("menuMusic", 70000);
			break;
		case 1:
			audioPlayer.load("./res/audio/jump.wav", "jump");
			audioPlayer.load("./res/audio/coin.wav", "coin");
//			audioPlayer.load("./res/audio/GloriousMorning.wav", "music1");
			audioPlayer.setVolume(0.1f);
			audioPlayer.setVolumeLevel(1);
//			audioPlayer.loop("music1");
			break;
		case 3:
			break;
		}
	}

	public Animation getAnimation(String s) {
		return animations.get(s);
	}

	public HashMap<String, Animation> getAnimations() {
		return animations;
	}

	public HashMap<String, Animation> getPlayerAnimations() {
		return playerAnimations;
	}

	public HashMap<String, Animation> getEnemyAnimations() {
		return enemyAnimations;
	}

	public BufferedImage getImage(String s) {
		return images.get(s);
	}

	public HashMap<String, BufferedImage> getImages() {
		return images;
	}

	public HashMap<String, BufferedImage> getTextures() {
		return textures;
	}

	public HashMap<String, BufferedImage[]> getLevels() {
		return levels;
	}

	public HashMap<String, BufferedImage> getEditorOuterTextures() {
		return editorOuterTextures;
	}

	public HashMap<String, BufferedImage> getEditorMiddleTextures() {
		return editorMiddleTextures;
	}

	public HashMap<String, Integer> getColorMap() {
		return colorMap;
	}

	public ArrayList<String>[] getOptions(String type) {
		return menuOptions.get(type);
	}
}
