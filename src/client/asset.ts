const ASSET_NAMES = ["avatar1.jpg", "avatar2.jpg", "avatar3.jpg", "avatar4.jpg", "avatar5.jpg"]

const assets = {}
const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset))

function downloadAsset(assetName) {
  return new Promise<void>(resolve => {
    const asset = new Image()
    asset.onload = () => {
      console.log(`Downloaded ${assetName}`)
      assets[assetName] = asset
      resolve()
    }
    asset.src = `/assets/${assetName}`
  })
}

export const downloadAssets = () => downloadPromise
export const getAsset = assetName => assets[assetName]
