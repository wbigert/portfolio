
package entity;

import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.util.HashMap;

import animation.Animation;
import gameState.GameStateManager;
import handlers.Handler;
import handlers.Id;
import handlers.MediaLoader;
import input.KeyStates;
import main.MainFrame;
import tile.SlopeTile;
import tile.SolidTile;

public abstract class Entity {

	protected int x, y, width, height;
	protected double accX;
	protected double velX, velY;
	protected Id id;
	protected Handler handler;
	protected GameStateManager gsm;
	protected KeyStates keyStates;
	protected MediaLoader mediaLoader;
	protected Animation currentAnimation;
	protected boolean velXReduction = false;
	protected boolean velYReduction = false;
	protected boolean isFacingRight = true;
	protected boolean isTouchingGround;
	protected boolean isTouchingSlope;
	protected final double MODERATE_GRAVITY = 1.1;
	protected final double STRONG_GRAVITY = 0.6;

	public Entity(int x, int y, int width, int height, Id id, Handler handler, MainFrame mainFrame) {
		this.gsm = handler.getGameStateManager();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.id = id;
		this.handler = handler;
		this.keyStates = mainFrame.getKeyStates();
		this.mediaLoader = mainFrame.getMediaLoader();
		this.isTouchingGround = false;
	}

	public abstract void render(Graphics2D g2d, double scale);

	public abstract void update(int[][] colMatrix, SolidTile[][] stm, SlopeTile[][] pstm);

	public void kill() {
		handler.removeEntity(this);
	}

	public int getEntityMatrixPositionY() {
		return y / 64;
	}

	public int getEntityMatrixPositionX() {
		return x / 64;
	}

	public Id getId() {
		return id;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public void setVelX(double velX) {
		this.velX = velX;
	}

	public void setAccX(double accX) {
		this.accX = accX;
	}

	public void setVelY(double velY) {
		this.velY = velY;
	}

	public Rectangle getBounds() {
		return new Rectangle(x, y, width, height);
	}

	public Rectangle getBoundsExtended() {
		return new Rectangle(x, y, width, height + 1);
	}

	public Rectangle getBoundsGround() {
		return new Rectangle(x + 8, y + height, width - 16, 1);
	}

	public Rectangle getBoundsLeftHalf() {
		return new Rectangle(x, y, width / 2, height);
	}

	public Rectangle getBoundsRightHalf() {
		return new Rectangle(x + (width / 2) - 1, y, width / 2, height);
	}

	public void startVelXReduction() {
		velXReduction = true;
	}

	public void stopVelXReduction() {
		velXReduction = false;
	}

	public void setAnimation(Animation animation) {
		currentAnimation = animation;
	}

	public void startAnimation() {
		currentAnimation.restart();
	}

	public boolean isTouchingGround() {
		return isTouchingGround;
	}

	public void setTouchingGround(boolean b) {
		isTouchingGround = b;
	}

	public double getVelX() {
		return velX;
	}

	public double getVelY() {
		return velY;
	}

	public void stopAnimation() {
		currentAnimation.stop();
	}

	public void resetAnimation() {
		currentAnimation.reset();
	}

	public boolean isReducingVelX() {
		return velXReduction;
	}

	public boolean isFacingRight() {
		return isFacingRight;
	}

	public int getWidth() {
		return width;
	}

	public int getHeight() {
		return width;
	}

	public void setFacingRight(boolean isFacingRight) {
		this.isFacingRight = isFacingRight;
	}

	public Animation getCurrentAnimation() {
		return currentAnimation;
	}

	public void setCurrentAnimation(Animation animation) {
		currentAnimation = animation;
	}

	public HashMap<String, Animation> getAnimations() {
		return null;
	}
}
