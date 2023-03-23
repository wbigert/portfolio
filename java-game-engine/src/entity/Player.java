
package entity;

import java.awt.Graphics2D;
import java.awt.Point;
import java.util.HashMap;

import animation.Animation;
import handlers.Handler;
import handlers.Id;
import main.MainFrame;
import tile.SlopeTile;
import tile.SolidTile;

public class Player extends Entity {

	private final double MAX_SPEED = 7.0;
	private final int MAX_JUMP = 30;
	private final int MIN_JUMP = 10;
	private final double INITIAL_GRAV = 10 / (double) MAX_JUMP;
	private int jumpCounter = 0;
	private HashMap<String, Animation> playerAnimations;
	private Coffin coffin;

	public Player(int x, int y, int width, int height, Id id, Handler handler, MainFrame mainFrame) {
		super(x, y, width, height, id, handler, mainFrame);
		setVelX(0);
		playerAnimations = mediaLoader.getPlayerAnimations();
		setAnimation(playerAnimations.get("standRight"));
	}

	public void render(Graphics2D g2d, double scale) {
		if (isFacingRight) {
			g2d.drawImage(currentAnimation.getCurrentImage(), (int) ((x - (96 / 2) + 10) * scale), (int) (y * scale),
					(int) (96 * scale), (int) (96 * scale), null);
		} else {
			g2d.drawImage(currentAnimation.getCurrentImage(), (int) ((x + (96 / 2) - 50) * scale), (int) (y * scale),
					(int) (96 * scale), (int) (96 * scale), null);
		}

		// debug

		// g2d.setColor(Color.green);
		// Rectangle rect = handler.getMainFrame().getCamera().getDeadZone();
		// g2d.drawRect((int) (rect.getX() * scale), (int) (rect.getY() * scale), (int)
		// (rect.getWidth() * scale),
		// (int) (rect.getHeight() * scale));

//		g2d.setColor(Color.orange);
//		g2d.fill(getBounds());
//		g2d.setColor(Color.green);
//
//		for (int y = getEntityMatrixPositionY(); y < getEntityMatrixPositionY() + 2; y++) {
//			for (int x = getEntityMatrixPositionX() - 1; x < getEntityMatrixPositionX() + 1; x++) {
//				g2d.draw(new Rectangle(x * 64, y * 64, 64, 64));
//			}
//		}
//
//		g2d.setColor(Color.red);
//		for (int y = getEntityMatrixPositionY(); y < getEntityMatrixPositionY() + 2; y++) {
//			for (int x = getEntityMatrixPositionX() + 1; x < getEntityMatrixPositionX() + 3; x++) {
//				g2d.draw(new Rectangle(x * 64, y * 64, 64, 64));
//			}
//		}
	}

	@Override
	public void update(int[][] colMatrix, SolidTile[][] stm, SlopeTile[][] sltm) {
		// update velocities
		calcVelX();
		calcVelY();

		// move
		y += (int) velY;
		x += (int) velX;

		// correct position
		checkEntityCollisions();
		checkTileCollisions(colMatrix, stm, sltm);

		// miscellaneous
		checkTouchingGround(colMatrix, stm, sltm);
		checkAnimations();

		if (isTouchingGround) {
			resetJumpCounter();
		}

	}

	private void calcVelX() {
		if (velXReduction) {
			if (Math.abs(velX) < 0.8) {
				velXReduction = false;
				accX = 0;
				velX = 0;
			} else if (velX < 0) {
				velX += 0.8;
			} else {
				velX -= 0.8;
			}
		} else if (Math.abs(velX + accX) < MAX_SPEED) {
			velX += accX;
		} else if (velX < 0) {
			velX = -MAX_SPEED;
		} else {
			velX = MAX_SPEED;
		}
	}

	private void calcVelY() {
		if (isTouchingGround) {
			velY = 0;
		} else if (velYReduction) {
			if (Math.abs(velY) < 1.5) {
				velYReduction = false;
				velY = 0.1;
			} else {
				velY += 1.5;
			}
		} else {
			if (velY < 0 && ((keyStates.isHeld("W")) || jumpCounter < MIN_JUMP)) {
				jumpCounter++;
			}
			if (velY < 0 && (jumpCounter <= MAX_JUMP && keyStates.isHeld("W")) || jumpCounter < MIN_JUMP) {
				velY += INITIAL_GRAV;
			} else if (velY < 0) {
				velYReduction = true;
			}
			if (velY >= 0 && !isTouchingGround) {
				velY += MODERATE_GRAVITY;
			}
		}
	}

	private void checkEntityCollisions() {
		if (coffin != null) {
			if (coffin.intersects(getBounds())) {
				Point toMove = coffin.findEvasion(getBounds());
				if (toMove.getY() < 0) {
					velY = 0;
					isTouchingGround = true;
				} else if (toMove.getY() > 0) {
					velY = 0;
				}
				this.x += toMove.getX();
				this.y += toMove.getY();
			}
		}

	}

	private void checkTileCollisions(int[][] colMatrix, SolidTile[][] stm, SlopeTile[][] sltm) {
		for (int y = getEntityMatrixPositionY(); y < getEntityMatrixPositionY() + 3; y++) {
			for (int x = getEntityMatrixPositionX(); x < getEntityMatrixPositionX() + 3; x++) {
				if (x >= handler.getLevelTileWidth() || x < 0 || y >= handler.getLevelTileHeight() || y < 0) {
					continue;
				}
				if (colMatrix[y][x] == 1) {
					if (sltm[y][x] != null) {
						checkCollisionSlope(sltm[y][x]);
					} else {
						checkCollisionSolid(stm[y][x]);
					}
				}
			}
		}
	}

	private void checkCollisionSolid(SolidTile st) {
		if (st.intersects(getBounds()) && !isTouchingSlope) {
			Point toMove = st.findEvasion(getBounds());
			if (toMove.getY() < 0) {
				velY = 0;
				isTouchingGround = true;
			} else if (toMove.getY() > 0) {
				velY = 0;
			}
			this.x += toMove.getX();
			this.y += toMove.getY();
		}

	}

	private void checkCollisionSlope(SlopeTile slt) {
		if (isTouchingGround && velY >= 0 && x + (width / 2) - 1 < slt.getX() + 64
				&& x + (width / 2) - 1 >= slt.getX()) {
			if (slt.getId() == Id.RIGHTTRIANGLE) {
				y = slt.findSlopePos(getBoundsLeftHalf());
			} else if (slt.getId() == Id.LEFTTRIANGLE) {
				y = slt.findSlopePos(getBoundsRightHalf());
			}
			velY = 0;
		}
	}

	private void checkTouchingGround(int[][] colMatrix, SolidTile[][] stm, SlopeTile[][] sltm) {
		if (coffin != null) {
			if (coffin.intersects(getBoundsExtended())) {
				isTouchingGround = true;
				return;
			}
		}

		for (int y = getEntityMatrixPositionY(); y < getEntityMatrixPositionY() + 3; y++) {
			for (int x = getEntityMatrixPositionX(); x < getEntityMatrixPositionX() + 3; x++) {
				if (x >= handler.getLevelTileWidth() || x < 0 || y >= handler.getLevelTileHeight() || y < 0) {
					continue;
				}
				if (colMatrix[y][x] == 1) {
					if (sltm[y][x] != null) {
						if (getBoundsExtended().intersects(sltm[y][x].getBounds())) {
							isTouchingSlope = true;
							if (sltm[y][x].intersects(getBoundsExtended()) && velY >= 0) {
								isTouchingGround = true;
								return;
							}
							return;
						}
					}
				}
			}
		}

		for (int y = getEntityMatrixPositionY(); y < getEntityMatrixPositionY() + 3; y++) {
			for (int x = getEntityMatrixPositionX(); x < getEntityMatrixPositionX() + 3; x++) {
				if (x >= handler.getLevelTileWidth() || x < 0 || y >= handler.getLevelTileHeight() || y < 0) {
					continue;
				}
				if (colMatrix[y][x] == 1) {
					if (stm[y][x] != null) {
						if (stm[y][x].getBounds().intersects(getBoundsGround())) {
							isTouchingGround = true;
							isTouchingSlope = false;
							return;
						}
					}
				}
			}
		}
		isTouchingSlope = false;
		isTouchingGround = false;
	}

	private void checkAnimations() {
		if (velY != 0) {
			if (!currentAnimation.equals(playerAnimations.get("jumpRight"))
					&& !getCurrentAnimation().equals(playerAnimations.get("jumpLeft"))) {
				if (isFacingRight) {
					currentAnimation = playerAnimations.get("jumpRight");
				} else {
					currentAnimation = playerAnimations.get("jumpLeft");
				}
			}

			if (currentAnimation.equals(playerAnimations.get("jumpRight")) && !isFacingRight) {
				currentAnimation = playerAnimations.get("jumpLeft");
			} else if (currentAnimation.equals(playerAnimations.get("jumpLeft")) && isFacingRight) {
				currentAnimation = playerAnimations.get("jumpRight");
			}

			if (velY > 0) {
				currentAnimation.setCurrentFrame(0);
			} else {
				currentAnimation.setCurrentFrame(1);
			}
		}
		if (velY == 0 && velX == 0 && !(currentAnimation.equals(playerAnimations.get("standRight"))
				|| currentAnimation.equals(playerAnimations.get("standLeft")))) {
			if (isFacingRight) {
				currentAnimation.reset();
				currentAnimation = playerAnimations.get("standRight");
				currentAnimation.start();
			} else {
				currentAnimation.reset();
				currentAnimation = playerAnimations.get("standLeft");
				currentAnimation.start();
			}
		} else if (velY == 0 && velX != 0 && !(currentAnimation.equals(playerAnimations.get("walkLeft"))
				|| currentAnimation.equals(playerAnimations.get("walkRight")))) {
			if (isFacingRight) {
				currentAnimation.reset();
				currentAnimation = playerAnimations.get("walkRight");
				currentAnimation.start();
			} else {
				currentAnimation.reset();
				currentAnimation = playerAnimations.get("walkLeft");
				currentAnimation.start();
			}
		}

		if (currentAnimation.equals(playerAnimations.get("walkRight")) && !isFacingRight) {
			currentAnimation.reset();
			currentAnimation = playerAnimations.get("walkLeft");
			currentAnimation.start();
		} else if (currentAnimation.equals(playerAnimations.get("walkLeft")) && isFacingRight) {
			currentAnimation.reset();
			currentAnimation = playerAnimations.get("walkRight");
			currentAnimation.start();
		}
		currentAnimation.update();
	}

	public void resetJumpCounter() {
		jumpCounter = 0;
	}

	public void setCoffin(Coffin coffin) {
		this.coffin = coffin;
	}
}
