package gameState;

import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.HashMap;

import handlers.MediaLoader;

public class EditorIterator {

	private HashMap<String, BufferedImage> outerTextures;
	private HashMap<String, BufferedImage> middleTextures;
	private HashMap<String, BufferedImage[]> levels;
	private HashMap<String, Integer> colorMap;
	private ArrayList<String> keyListOutTex;
	private ArrayList<String> keyListMidTex;
	private ArrayList<String> keyListLev;
	private int outerTextureIndex = 0;
	private int middleTextureIndex = 0;
	private int levelIndex = 0;
	private int layerIndex = 0;
	private int numLayers = 3;

	public EditorIterator(MediaLoader mediaLoader) {
		outerTextures = mediaLoader.getEditorOuterTextures();
		middleTextures = mediaLoader.getEditorMiddleTextures();
		levels = mediaLoader.getLevels();
		colorMap = mediaLoader.getColorMap();
		keyListOutTex = new ArrayList<>(outerTextures.keySet());
		keyListMidTex = new ArrayList<>(middleTextures.keySet());
		keyListLev = new ArrayList<>(levels.keySet());
	}

	public int getCurrentRGB() {
		if (layerIndex == 1) {
			return colorMap.get(keyListMidTex.get(middleTextureIndex));
		} else {
			return colorMap.get(keyListOutTex.get(outerTextureIndex));
		}
	}

	public BufferedImage getCurrentTexture() {
		if (layerIndex == 1) {
			return middleTextures.get(keyListMidTex.get(middleTextureIndex));
		} else {
			return outerTextures.get(keyListOutTex.get(outerTextureIndex));
		}
	}

	public BufferedImage getCurrentLayer() {
		return levels.get(getCurrentLevelString())[layerIndex];
	}

	public int getCurrentLayerIndex() {
		return layerIndex;
	}

	public BufferedImage[] getCurrentLevel() {
		return levels.get(keyListLev.get(levelIndex));
	}

	public String getCurrentTextureString() {
		if (layerIndex == 1) {
			return keyListMidTex.get(middleTextureIndex);
		} else {
			return keyListOutTex.get(outerTextureIndex);
		}
	}

	public String getCurrentLevelString() {
		return keyListLev.get(levelIndex);
	}

	public void incrementTexture() {
		if (layerIndex == 1) {
			if (middleTextureIndex < keyListMidTex.size() - 1) {
				middleTextureIndex++;
			} else {
				middleTextureIndex = 0;
			}
		} else {
			if (outerTextureIndex < keyListOutTex.size() - 1) {
				outerTextureIndex++;
			} else {
				outerTextureIndex = 0;
			}
		}
	}

	public void decrementTexture() {
		if (layerIndex == 1) {
			if (middleTextureIndex > 0) {
				middleTextureIndex--;
			} else {
				middleTextureIndex = keyListMidTex.size() - 1;
			}
		} else {
			if (outerTextureIndex > 0) {
				outerTextureIndex--;
			} else {
				outerTextureIndex = keyListOutTex.size() - 1;
			}
		}
	}

	public void incrementLevel() {
		if (levelIndex < keyListLev.size() - 1) {
			levelIndex++;
		} else {
			levelIndex = 0;
		}
	}

	public void decrementLevel() {
		if (levelIndex > 0) {
			levelIndex--;
		} else {
			levelIndex = keyListLev.size() - 1;
		}
	}

	public void incrementLayer() {
		if (layerIndex < numLayers - 1) {
			layerIndex++;
		} else {
			layerIndex = 0;
		}
	}

	public void decrementLayer() {
		if (layerIndex > 0) {
			layerIndex--;
		} else {
			layerIndex = numLayers - 1;
		}
	}
}
