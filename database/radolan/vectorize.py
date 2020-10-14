import gdal
import os
from gdal import ogr, osr
from datetime import datetime
from crop import create_filelist
from tqdm import tqdm


def vectorize_data():
    filelist = create_filelist()

    print("Starting vectorization...")
    for file in tqdm(filelist, unit=" files"):
        # get the date from the filename
        file_split = file.split("/")
        date_time_obj = datetime.strptime(
            file_split[len(file_split)-1], 'RW_%Y%m%d-%H%M.asc')

        filename_input = "./temp/radolan_cropped/{}".format(
            date_time_obj.strftime("%Y%m%d-%H%M"))
        filename_output = "./temp/radolan_vectorized/{}".format(
            date_time_obj.strftime("%Y%m%d-%H%M"))

        source = gdal.Open(filename_input + ".tif")
        band = source.GetRasterBand(1)
        bandArray = band.ReadAsArray()

        driver = ogr.GetDriverByName("ESRI Shapefile")

        # remove if already exists
        if os.path.exists(filename_output + ".shp"):
            driver.DeleteDataSource(filename_output + ".shp")

        target = driver.CreateDataSource(filename_output + ".shp")

        srs = osr.SpatialReference()
        srs.ImportFromProj4(
            "+proj=stere +lon_0=10.0 +lat_0=90.0 +lat_ts=60.0 +a=6370040 +b=6370040 +units=m")

        targetLayer = target.CreateLayer("radolan", srs=srs)
        targetField = ogr.FieldDefn("rain", ogr.OFTInteger)
        targetLayer.CreateField(targetField)

        gdal.Polygonize(band, None, targetLayer, 0, [], callback=None)

        target.Destroy()
        source = None
        bandArray = None

    print("Vectorization complete.")


if __name__ == "__main__":
    vectorize_data()