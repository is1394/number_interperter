from __future__ import division
from PIL import Image, ImageFilter


def convertToPNG(argv):
    img = Image.open(argv)
    img = img.convert("RGBA")
    datas = img.getdata()
    newData = []
    for item in datas:
        if item[0] == 255 and item[1] == 255 and item[2] == 255:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    img.putdata(newData)
    return img


def imageprepare(argv):
    """
    This function returns the pixel values.
    The imput is a png file location.
    """
    im = convertToPNG(argv)
    im = im.convert('L')
    width = float(im.size[0])
    height = float(im.size[1])
    # creates white canvas of 28x28 pixels
    newImage = Image.new('L', (28, 28), (255))

    if width > height:  # check which dimension is bigger
        # Width is bigger. Width becomes 20 pixels.
        # resize height according to ratio width
        nheight = int(round((20.0 / width * height), 0))
        if (nheight == 0):  # rare case but minimum is 1 pixel
            nheight = 1
# resize and sharpen
        img = im.resize((20, nheight), Image.ANTIALIAS).filter(
            ImageFilter.SHARPEN)
        # calculate horizontal position
        wtop = int(round(((28 - nheight) / 2), 0))
        newImage.paste(img, (4, wtop))  # paste resized image on white canvas
    else:
        # Height is bigger. Heigth becomes 20 pixels.
        # resize width according to ratio height
        nwidth = int(round((20.0 / height * width), 0))
        if (nwidth == 0):  # rare case but minimum is 1 pixel
            nwidth = 1
# resize and sharpen
        img = im.resize((nwidth, 20), Image.ANTIALIAS).filter(
            ImageFilter.SHARPEN)
        # caculate vertical pozition
        wleft = int(round(((28 - nwidth) / 2), 0))
        newImage.paste(img, (wleft, 4))  # paste resized image on white canvas

    # newImage.save("sample.png

    tv = list(newImage.getdata())  # get pixel values

    # normalize pixels to 0 and 1. 0 is pure white, 1 is pure black.
    tva = [(255 - x) * 1.0 / 255.0 for x in tv]
    # print(tva)
    return tva

# file path here
# print(len(x))# mnist IMAGES are 28x28=784 pixels
