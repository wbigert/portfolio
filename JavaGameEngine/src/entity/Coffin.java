package entity;

import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;

import animation.Animation;
import handlers.Handler;
import handlers.Id;
import main.MainFrame;
import tile.SlopeTile;
import tile.SolidTile;

public class Coffin extends Entity {

	private Animation coffinRight;
	private Animation coffinLeft;

	private double gradient;
	private boolean hasTouchedSolid = false;
	private boolean isStationary = false;
	private boolean isAttached = false;

	private final double COFFIN_GRAV = 0.6;

	public Coffin(int x, int y, int width, int height, Id id, Handler handler, MainFrame mainFrame) {
		super(x, y, width, height, id, handler, mainFrame);
		setVelX(0);
		coffinRight = mediaLoader.getAnimations().get("coffinRight");
		coffinLeft = mediaLoader.getAnimations().get("coffinLeft");
		currentAnimation = coffinRight;
		currentAnimation.start();
	}

	@Override
	public void render(Graphics2D g2d, double scale) {
		if (isAttached) {
			if (isFacingRight) {
				g2d.drawImage(mediaLoader.getImages().get("attatchedCoffinLeft"), (int) ((x - 10) * scale),
						(int) (y * scale), (int) (96 * scale), (int) (32 * scale), null);
			} else {
				g2d.drawImage(mediaLoader.getImages().get("attatchedCoffinRight"), (int) ((x + 10) * scale),
						(int) (y * scale), (int) (96 * scale), (int) (32 * scale), null);
			}
		} else {
			if (isFacingRight) {
				g2d.drawImage(currentAnimation.getCurrentImage(), (int) (x * scale), (int) ((y - 30) * scale),
						(int) (90 * scale), (int) (100 * scale), null);
			} else {
				g2d.drawImage(currentAnimation.getCurrentImage(), (int) (x * scale), (int) ((y - 30) * scale),
						(int) (90 * scale), (int) (100 * scale), null);
			}
		}

//		// debug
//		g2d.setColor(Color.ORANGE);
//		g2d.fill(getBounds());

	}

	@Override
	public void update(int[][] colMatrix, SolidTile[][] stm, SlopeTile[][] sltm) {
		if (isAttached) {
			return;
		}
		// update velocities
		calcVelX();
		calcVelY();

		// move
		System.out.println("pre iterat velX: " + (int) velX);
		y += (int) velY;
		int temp = x;
		x += (int) velX;

		System.out.println("changed x with:" + (x - temp));

		// correct position
		checkTileCollisions(colMatrix, stm, sltm);

		// miscellaneous
		checkGradient();
		checkAnimation();

	}

	private void calcVelX() {
		if (velXReduction) {
			System.out.println("reducing");
			if (Math.abs(velX) < 0.8) {
				velXReduction = false;
				accX = 0;
				velX = 0;
			} else if (velX < 0) {
				velX += 0.8;
			} else {
				velX -= 0.8;
			}
		}
	}

	private void calcVelY() {
		if (isStationary) {
			velY = 0;
		} else if (velYReduction) {
			if (Math.abs(velY) < 1.5) {
				velYReduction = false;
				velY = 0.1;
			} else {
				velY += 1.5;
			}
		} else {
			if (hasTouchedSolid) {
				velY += COFFIN_GRAV;
			} else if (!hasTouchedSolid) {
				velY += COFFIN_GRAV / 2;
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
					if (stm[y][x] != null) {
						if (getBounds().intersects(stm[y][x].getBounds())) {
							checkCollisionSolid(stm[y][x]);
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
					if (sltm[y][x] != null) {
						if (sltm[y][x].intersects(getBounds())) {
							checkCollisionSlope(sltm[y][x]);
							return;
						}
					}
				}
			}
		}

	}

	private void checkCollisionSolid(SolidTile st) {
		if (st.intersects(getBoundsGround()) && Math.abs(velY) < 2.5 && Math.abs(velX) < 1.0) {
			System.out.println("solid");
			velY = 0;
			velX = 0;
			isStationary = true;
			Point toMove = st.findEvasion(getBounds());
			this.x += toMove.getX();
			this.y += toMove.getY();
		} else if (st.intersects(getBounds())) {
			Point toMove = st.findEvasion(getBounds());
			if (velX < -12) {
				if (!st.bordersRight()) {
					this.x += toMove.getX();
					this.y += toMove.getY();
					isAttached = true;
					velY = 0;
					velX = 0;
					x -= width / 2;
					return;
				}
			} else if (velX > 12) {
				if (!st.bordersLeft()) {
					this.x += toMove.getX();
					this.y += toMove.getY();
					isAttached = true;
					velY = 0;
					velX = 0;
					x += width / 2;
					return;
				}
			}
			hasTouchedSolid = true;

			if (toMove.getY() < 0) {
				if (Math.abs(velY) < 2.5) {
					velY = 0;
					velX = 0.7 * velX;
				} else {
					velY = -0.4 * velY;
					velX = 0.7 * velX;
				}
			} else if (toMove.getY() > 0) {
				if (Math.abs(velY) < 2.5) {
					velY = velY * 2;
				} else {
					velY = -0.6 * velY;
					velX = 0.6 * velX;
				}
			} else {
				velX = -0.3 * velX;
			}
			this.x += toMove.getX();
			this.y += toMove.getY();
		}
	}

	private void checkCollisionSlope(SlopeTile slt) {
		if (slt.intersects(getBounds()) && Math.abs(velY) < 2.5 && Math.abs(velX) < 1.5) {
			velY = 0;
			velX = 0;
			isStationary = true;
		} else if (slt.intersects(getBounds())) {
			System.out.println("slope, velx: " + velX);
			x -= velX;
			y = slt.findSlopePos(getBounds());
			hasTouchedSolid = true;
			if (slt.getId() == Id.RIGHTTRIANGLE) {
				if (velX < 0) {
					velY = -0.6 * velY;
					velX = 0.7 * velX;
				} else if (velX > 0) {
					velY = -0.6 * velY;
					velX = -0.7 * velX;
				} else {
					velY = -0.6 * velY;
				}

			} else if (slt.getId() == Id.LEFTTRIANGLE) {
				if (velX < 0) {
					velY = -0.6 * velY;
					velX = -0.7 * velX;
				} else if (velX > 0) {
					velY = -0.6 * velY;
					velX = 0.7 * velX;
				} else {
					velY = -0.6 * velY;
				}

			}
		}
	}

	private void checkGradient() {
		if (velX == 0 && velY != 0) {
			if (velY > 0) {
				gradient = 2147483647;
				return;
			} else {
				gradient = -2147483647;
				return;
			}
		} else if (velX == 0 && velY == 0) {
			gradient = 0;
		} else {
			gradient = -velY / Math.abs(velX);
		}
	}

	private void checkAnimation() {
		if (isFacingRight) {
			if (!currentAnimation.equals(coffinRight)) {
				currentAnimation = coffinRight;
			}

		} else if (!currentAnimation.equals(coffinLeft)) {
			currentAnimation = coffinLeft;
		}

		if (hasTouchedSolid) {
			currentAnimation.setCurrentFrame(3);
		} else if (gradient >= 3) {
			currentAnimation.setCurrentFrame(0);
		} else if (gradient >= 1.5 && gradient < 3) {
			currentAnimation.setCurrentFrame(1);
		} else if (gradient >= 0.5 && gradient < 1.5) {
			currentAnimation.setCurrentFrame(2);
		} else if (gradient >= -0.5 && gradient < 0.5) {
			currentAnimation.setCurrentFrame(3);
		} else if (gradient >= -1.5 && gradient < -0.5) {
			currentAnimation.setCurrentFrame(4);
		} else if (gradient >= -3 && gradient < -1.5) {
			currentAnimation.setCurrentFrame(5);
		} else {
			currentAnimation.setCurrentFrame(6);
		}
	}

	public boolean intersects(Rectangle rec) {
		return getBounds().intersects(rec);
	}

	public Point findEvasion(Rectangle rectangle) {
		Rectangle rec = getBounds().intersection(rectangle);
		if (rec.getHeight() > rec.getWidth()) {
			if (rec.getCenterX() > getBounds().getCenterX()) {
				return new Point((int) rec.getWidth(), 0);
			} else {
				return new Point((int) -rec.getWidth(), 0);
			}
		} else {
			if (rec.getCenterY() > getBounds().getCenterY()) {
				if (handler.getPlayer().getVelY() > 0) {
					return new Point(0, 0);
				} else {
					return new Point(0, (int) rec.getHeight());
				}
			} else {
				if (handler.getPlayer().getVelY() < 0) {
					return new Point(0, 0);
				} else {
					return new Point(0, (int) -rec.getHeight());
				}
			}
		}

	}

}
