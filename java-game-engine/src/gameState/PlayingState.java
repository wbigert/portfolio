package gameState;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.geom.AffineTransform;
import java.util.HashMap;

import animation.Animation;
import entity.Coffin;
import entity.Player;
import handlers.Id;
import main.MainFrame;
import tile.SlopeTile;
import tile.SolidTile;

public class PlayingState extends GameState {

	private HashMap<String, Animation> playerAnimations;
	private Player player;
	private Coffin coffin;
	private Menu menu;
	private int coffinThrowCharge = 0;
	private int coffinThrowChargeMax = 100;

	public PlayingState(GameStateManager gsm, MainFrame mainFrame) {
		super(gsm, mainFrame);
		init();

	}

	public void init() {
		gsm.clearLevel();
		gsm.createLevel("test");

		menu = new Menu(new Font("Courier", Font.PLAIN, 40), new Point((mainFrame.getFrameWidth() / 2) - 150, 80), 30,
				Color.white, Color.white, new Point(300, 70), "PLAYING", 5, 0.8f, mainFrame, gsm, this);

		player = (Player) handler.getPlayer();
		playerAnimations = mediaLoader.getPlayerAnimations();
		camera.updateLevelBoundaries(handler);
		camera.resetDeadZone(player, 200, 300);
	}

	public void update() {
		if (menu.isPaused()) {
			menu.handleInput("PLAYING");
		} else {
			handleInput();
			camera.update(player);
			handler.update();
		}
	}

	private boolean coffinWillCollide(double angle) {
		int xPos = (int) (player.getWidth() * Math.cos(angle));
		int yPos = (int) -(player.getWidth() * Math.sin(angle));
		Rectangle rect = new Rectangle(player.getX() + player.getWidth() / 2 + xPos - 60, player.getY() + yPos - 32,
				120, 50);

		int[][] colMatrix = handler.getTileCollisionMatrix();
		SolidTile[][] stm = handler.getSolidTileMatrix();
		SlopeTile[][] sltm = handler.getSlopeTileMatrix();

		for (int y = rect.y / 64; y < rect.y / 64 + 3; y++) {
			for (int x = rect.x / 64; x < rect.x / 64 + 3; x++) {
				if (x >= handler.getLevelTileWidth() || x < 0 || y >= handler.getLevelTileHeight() || y < 0) {
					continue;
				}
				if (colMatrix[y][x] == 1) {
					if (sltm[y][x] != null) {
						if (sltm[y][x].intersects(rect)) {
							return true;
						}
					} else {
						if (stm[y][x].getBounds().intersects(rect)) {
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	public void render(Graphics g) {
		g.setColor(Color.gray);
		g.fillRect(0, 0, mainFrame.getFrameWidth(), mainFrame.getFrameHeight());
		g.translate(-camera.getX(), -camera.getY());
		drawVaryingGraphics(g);
		g.translate(camera.getX(), camera.getY());
		drawStaticGraphics(g, mainFrame);

		menu.render(g);
		Toolkit.getDefaultToolkit().sync();
	}

	private void drawStaticGraphics(Graphics g, MainFrame mainFrame) {
	}

	private void drawVaryingGraphics(Graphics g) {
		gsm.getHandler().render(g, camera.getZoom());

		Graphics2D g2d = (Graphics2D) g;
		double zoom = camera.getZoom();
		Rectangle indicator = new Rectangle((int) ((player.getX() + player.getWidth() / 2) * zoom),
				(int) ((player.getY() + 15) * zoom), (int) (coffinThrowCharge * zoom), 2);
		double currentAngle = camera.findRelativeCursorAngle(player);

		if (coffinWillCollide(currentAngle)) {
			g2d.setColor(Color.red);
		} else {
			g2d.setColor(Color.green);
		}

		AffineTransform at = AffineTransform.getRotateInstance(-currentAngle, indicator.getX(), indicator.getY());
		g2d.fill(at.createTransformedShape(indicator));
	}

	public void handleInput() {
		keyReleaseCheck();
		keyPressCheck();
	}

	private void keyPressCheck() {
		if (keyStates.isPressed("F")) {
			System.exit(0);
		} else if (keyStates.isPressed("ESCAPE")) {
			menu.pause();
		} else if (keyStates.isPressed("W")) {
			if (player.isTouchingGround()) {
				player.setVelY(-12);
				player.setTouchingGround(false);
				audioPlayer.play("jump");
			}
		} else if (keyStates.isPressed("A")) {
			if (player.isFacingRight()) {
				player.startVelXReduction();
			}
			player.setFacingRight(false);
			if (player.isReducingVelX()) {
				player.stopVelXReduction();
				player.setAccX(0);
				player.setVelX(0);
			}
			if (player.getVelX() < 0) {
				if (player.getVelX() < -2) {
					player.setAccX(0);
				} else {
					player.setAccX(-0.5);
				}
			} else {
				player.setAccX(-0.5);
			}
		} else if (keyStates.isPressed("D")) {
			if (!player.isFacingRight()) {
				player.startVelXReduction();
			}
			player.setFacingRight(true);
			if (player.isReducingVelX()) {
				player.stopVelXReduction();
				player.setAccX(0);
				player.setVelX(0);
			}
			if (player.getVelX() > 0) {
				if (player.getVelX() > 2) {
					player.setAccX(0);
				} else {
					player.setAccX(0.5);
				}
			} else {
				player.setAccX(0.5);
			}
		} else if (keyStates.isPressed("E")) {
			coffinThrowCharge = 30;
		} else if (keyStates.isHeld("E")) {
			if (coffinThrowCharge < coffinThrowChargeMax) {
				coffinThrowCharge++;
			}
		} else if (keyStates.isPressed("COMMA")) {
			if (camera.getZoom() > 0.3) {
				camera.setZoom(camera.getZoom() - (0.125));
				camera.resetDeadZone(player, (int) (180 / camera.getZoom()), (int) (200 / camera.getZoom()));
				camera.reset(player);
			}
		} else if (keyStates.isPressed("PERIOD")) {
			if (camera.getZoom() < 2.5) {
				camera.setZoom(camera.getZoom() + (0.125));
				camera.resetDeadZone(player, (int) (180 / camera.getZoom()), (int) (200 / camera.getZoom()));
				camera.reset(player);
			}
		} else if (mouseWheelStates.isPressed("DOWN")) {
			if (camera.getZoom() > 0.3) {
				camera.setZoom(camera.getZoom() - (0.125));
				camera.resetDeadZone(player, (int) (180 / camera.getZoom()), (int) (200 / camera.getZoom()));
				camera.reset(player);
			}
		} else if (mouseWheelStates.isPressed("UP")) {
			if (camera.getZoom() < 2.5) {
				camera.setZoom(camera.getZoom() + (0.125));
				camera.resetDeadZone(player, (int) (180 / camera.getZoom()), (int) (200 / camera.getZoom()));
				camera.reset(player);
			}
		} else if (keyStates.isPressed("SPACE")) {
			camera.resetDeadZone(player);
		} else if (keyStates.isHeld("SPACE")) {
			camera.resetDeadZone(player);
		} else if (keyStates.isPressed("Y")) {
			camera.toggleFollowEntity(player);
		}

	}

	private void keyReleaseCheck() {
		if (keyStates.isReleased("A") && !player.isFacingRight()) {
			player.resetAnimation();
			player.setAnimation(playerAnimations.get("standLeft"));
			player.startAnimation();

			player.startVelXReduction();
			player.setAccX(0);
		}
		if (keyStates.isReleased("D") && player.isFacingRight()) {
			player.resetAnimation();
			player.setAnimation(playerAnimations.get("standRight"));
			player.startAnimation();

			player.startVelXReduction();
			player.setAccX(0);
		}
		if (keyStates.isReleased("E")) {
			double angle = camera.findRelativeCursorAngle(player);
			if (!coffinWillCollide(angle)) {
				int xPos = (int) (player.getWidth() * Math.cos(angle));
				int yPos = (int) -(player.getWidth() * Math.sin(angle));
				double velX = Math.cos(angle) * (coffinThrowCharge / 5);
				double velY = -Math.sin(angle) * (coffinThrowCharge / 5);

				handler.addEntity(new Coffin(player.getX() + player.getWidth() / 2 + xPos - 60,
						player.getY() + yPos - 32, 90, 40, Id.COFFIN, handler, mainFrame));
				coffin = (Coffin) handler.getEntities().getLast();
				player.setCoffin(coffin);
				if (velX > 0) {
					coffin.setFacingRight(true);
				} else {
					coffin.setFacingRight(false);
				}
				coffin.setVelX(velX);
				coffin.setVelY(velY);
			}
			coffinThrowCharge = 0;
		}
	}

	public void restart() {
		handler.clearLevel();
		handler.createLevel("test");
		menu = null;
		player = null;
		playerAnimations = null;
		init();

	}
}
