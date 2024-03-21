import {useEffect, useState} from 'react';
import {read, utils} from 'xlsx';

const DATA_URL =
  'https://docs.google.com/spreadsheets/d/1cLHDS_xpYKVs71Ij2oFbU6m-MYU2C6Ng/edit?usp=sharing&ouid=107718469965044379746&rtpof=true&sd=true';

interface ShopCoordinates {
  shopCode: string;
  shopName: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  numOfHouse: string;
  street: string;
  latitude: number;
  longitude: number;
}

const useCoordinatesData = () => {
  const [coordinatesData, setCoordinatesData] = useState<
    ShopCoordinates[] | undefined
  >([]);

  const readExcelFile = async () => {
    try {
      const response = await fetch(DATA_URL);
      const arrayBuffer = await response.arrayBuffer();
      const content = new Uint8Array(arrayBuffer);
      const workbook = read(content, {
        type: 'array',
        raw: true,
      });
      const sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheet_name];
      const data = utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const coordinates: ShopCoordinates[] = (data as Array<Array<any>>)
        .slice(2)
        .map(row => ({
          shopCode: row[1],
          shopName: row[2],
          provinceId: row[3],
          districtId: row[4],
          wardId: row[5],
          numOfHouse: row[6],
          street: row[7],
          latitude: row[8],
          longitude: row[9],
        }));

      return coordinates;
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  useEffect(() => {
    readExcelFile().then(res => setCoordinatesData(res));
  }, []);

  return coordinatesData;
};

export default useCoordinatesData;
