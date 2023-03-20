
package handlers;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Polygon;
import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.LinkedList;

import animation.Animation;
import audio.AudioPlayer;
import entity.Entity;
import entity.Observer;
import entity.Player;
import gameState.GameStateManager;
import main.MainFrame;
import tile.CosmeticTile;
import tile.SlopeTile;
import tile.SolidTile;
import tile.Tile;

public class Handler {
	private MainFrame mainFrame;
	private AudioPlayer audioPlayer;
	private MediaLoader mediaLoader;
	private GameStateManager gsm;

	private int width;
	private int height;
	private LinkedList<Entity> entities = new LinkedList<Entity>();
	private Tile[][][] renderMatrix;
	private SolidTile[][] solidTileMatrix;
	private SlopeTile[][] slopeTileMatrix;
	private int[][] tileCollisionMatrix;

	public Handler(MainFrame mainFrame, GameStateManager gsm) {
		this.gsm = gsm;
		this.mediaLoader = mainFrame.getMediaLoader();
		this.mainFrame = mainFrame;
		this.audioPlayer = mainFrame.getAudioPlayer();
	}

	public void render(Graphics g, double zoom) {
		Graphics2D g2d = (Graphics2D) g.create();
		renderTiles(g2d, zoom, mainFrame.getCamera());

		for (Entity en : entities) {
			en.render(g2d, zoom);
		}
		g2d.dispose();
	}

	public void update() {
		for (int i = 0; i < entities.size(); i++) {
			Entity en = entities.get(i);
			en.update(tileCollisionMatrix, solidTileMatrix, slopeTileMatrix);
		}
	}

	public void renderTiles(Graphics2D g2d, double zoom, Camera camera) {
		for (int y = (int) (getCameraMatrixPositionY(camera))
				- 3; y < (int) (getCameraMatrixPositionY(camera) + (mainFrame.getFrameHeight() / 64) / zoom) + 4; y++) {
			for (int x = (int) (getCameraMatrixPositionX(camera))
					- 3; x < (int) (getCameraMatrixPositionX(camera) + (mainFrame.getFrameWidth() / 64) / zoom)
							+ 4; x++) {
				if (x >= width || x < 0 || y >= height || y < 0) {
					continue;
				}
				// render all 3 layers for each map tile
				for (int i = 0; i < 3; i++) {
					if (renderMatrix[y][x][i] != null) {
						renderMatrix[y][x][i].render(g2d, zoom);
					}
				}
			}
		}
	}

	public LinkedList<Entity> getEntities() {
		return entities;
	}

	public AudioPlayer getAudioPlayer() {
		return audioPlayer;
	}

	public int getLevelTileWidth() {
		return width;
	}

	public int getLevelTileHeight() {
		return height;
	}

	public void addEntity(Entity en) {
		entities.add(en);
	}

	public void removeEntity(Entity en) {
		entities.remove(en);
	}

	public void addSolidTile(SolidTile tile) {
		int posX = tile.getX() / 64;
		int posY = tile.getY() / 64;
		renderMatrix[posY][posX][1] = tile;
		solidTileMatrix[posY][posX] = tile;
		tileCollisionMatrix[posY][posX] = 1;
	}

	public void removeSolidTile(int x, int y) {
		int posX = x / 64;
		int posY = y / 64;
		renderMatrix[posY][posX][1] = null;
		solidTileMatrix[posY][posX] = null;
		tileCollisionMatrix[posY][posX] = 0;
	}

	private double getCameraMatrixPositionX(Camera camera) {
		return (camera.getX() / camera.getZoom()) / 64;
	}

	private double getCameraMatrixPositionY(Camera camera) {
		return (camera.getY() / camera.getZoom()) / 64;
	}

	public void createLevel(String s) {
		long startTime = System.currentTimeMillis();
		HashMap<String, BufferedImage> textures = mediaLoader.getTextures();
		BufferedImage[] layers = mediaLoader.getLevels().get(s);
		HashMap<String, Integer> colorMap = mediaLoader.getColorMap();
		width = layers[0].getWidth();
		height = layers[0].getHeight();

		renderMatrix = new Tile[height][width][3];

		// for collisions
		solidTileMatrix = new SolidTile[height][width];
		slopeTileMatrix = new SlopeTile[height][width];
		tileCollisionMatrix = new int[height][width];

		// find player in middle layer
		BufferedImage layer = layers[1];

		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				int pixel = layer.getRGB(x, y);

				if (pixel == colorMap.get("player")) {
					addEntity(new Player(x * 64, y * 64, 60, 96, Id.PLAYER, this, mainFrame));
					addEntity(new Observer(x * 64, y * 64, 64, 64, Id.COFFIN, this, mainFrame));
				}
			}
		}

		// create solid tiles from middle layer
		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				int pixel = layer.getRGB(x, y);

				if (pixel == colorMap.get("set3Brick1")) {
					SolidTile element = new SolidTile(x * 64, y * 64, 64, 64, Id.SOLIDTILE, textures.get("set3Brick1"),
							null, this);
					renderMatrix[y][x][1] = element;
					solidTileMatrix[y][x] = element;
					tileCollisionMatrix[y][x] = 1;
				} else if (pixel == colorMap.get("set3Crate1")) {
					SolidTile element = new SolidTile(x * 64, y * 64, 64, 64, Id.SOLIDTILE, textures.get("set3Crate1"),
							null, this);
					renderMatrix[y][x][1] = element;
					solidTileMatrix[y][x] = element;
					tileCollisionMatrix[y][x] = 1;
				} else if (pixel == colorMap.get("set3PStair1")) {
					// triangle
					Polygon polygon = new Polygon(new int[] { (x * 64) - 1, (x * 64) + 64, (x * 64) + 64 },
							new int[] { y * 64 + 64, y * 64 + 64, (y * 64) - 1 }, 3);
					SlopeTile element = new SlopeTile(x * 64, y * 64, 64, 64, Id.RIGHTTRIANGLE,
							textures.get("set3PStair1"), polygon, this);
					renderMatrix[y][x][1] = element;
					slopeTileMatrix[y][x] = element;
					tileCollisionMatrix[y][x] = 1;

				} else if (pixel == colorMap.get("set3PStair2")) {
					// triangle
					Polygon polygon = new Polygon(new int[] { (x * 64) - 1, (x * 64) - 1, (x * 64) + 64 },
							new int[] { (y * 64) - 1, y * 64 + 64, y * 64 + 64 }, 3);
					SlopeTile element = new SlopeTile(x * 64, y * 64, 64, 64, Id.LEFTTRIANGLE,
							textures.get("set3PStair2"), polygon, this);
					renderMatrix[y][x][1] = element;
					slopeTileMatrix[y][x] = element;
					tileCollisionMatrix[y][x] = 1;
				}
			}
		}

		// create cosmetic tiles from first and last layers
		for (int i = 0; i < 3; i = i + 2) {
			layer = layers[i];

			for (int y = 0; y < height; y++) {
				for (int x = 0; x < width; x++) {
					int pixel = layer.getRGB(x, y);

					if (pixel == colorMap.get("set3CBrick1")) {
						CosmeticTile element = new CosmeticTile(x * 64, y * 64, 64, 64, Id.COSMETICTILE,
								textures.get("set3CBrick1"), null, this);
						renderMatrix[y][x][i] = element;
					}
				}
			}

		}

		System.out.println(System.currentTimeMillis() - startTime);
	}

	public HashMap<String, Animation> getPlayerAnimations() {
		return entities.getFirst().getAnimations();
	}

	public Player getPlayer() {
		return (Player) entities.getFirst();
	}

	public GameStateManager getGameStateManager() {
		return gsm;
	}

	public Observer getObserver() {
		return (Observer) entities.get(1);
	}

	public void clearLevel() {
		entities.clear();
		solidTileMatrix = null;
		slopeTileMatrix = null;
		renderMatrix = null;
	}

	public SolidTile[][] getSolidTileMatrix() {
		return solidTileMatrix;
	}

	public SlopeTile[][] getSlopeTileMatrix() {
		return slopeTileMatrix;
	}

	public int[][] getTileCollisionMatrix() {
		return tileCollisionMatrix;
	}

	public MainFrame getMainFrame() {
		return mainFrame;
	}
}
