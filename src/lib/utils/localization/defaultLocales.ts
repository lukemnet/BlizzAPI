import constants from '../../constants';
import { validateRegionId } from './regions';
import { Locale, DefaultLocaleIndex, RegionIdAsNumberOrString } from '../../types';
import { IRegionIdProperties } from '../../interfaces';
import { getAllLocales } from './locales';

/**
 * Returns a list of all available default locale indexes
 *
 * @return List of all available default locale indexes indexed by region id.
 */
export function getAllDefaultLocaleIndexes() {
  return constants.DEFAULT_LOCALES;
}

/**
 * Returns a default locale index for given region id
 *
 * @param regionId Region id as number or string
 * @return Index of default locale for given region id
 */
export function getDefaultLocaleIndexForRegionId(regionId: RegionIdAsNumberOrString): DefaultLocaleIndex {
  const regionIdAsString = regionId.toString();
  const isRegionIdValid = validateRegionId(regionIdAsString);

  if (!isRegionIdValid) {
    throw new RangeError(`${regionIdAsString} is not a valid parameter for getDefaultLocaleIndexForRegionId()`);
  }

  return constants.DEFAULT_LOCALES[regionIdAsString];
}

/**
 * Returns a default locale name for given region id
 *
 * @param regionId Region id as number or string
 * @return Name of the default locale for given region id
 */
export function getDefaultLocaleNameForRegionId(regionId: RegionIdAsNumberOrString): Locale {
  const regionIdAsString = regionId.toString();
  const isRegionIdValid = validateRegionId(regionIdAsString);

  if (!isRegionIdValid) {
    throw new RangeError(`${regionIdAsString} is not a valid parameter for getDefaultLocaleNameForRegionId()`);
  }

  const defaultLocaleIndex = constants.DEFAULT_LOCALES[regionIdAsString];
  return constants.LOCALES[regionId][defaultLocaleIndex];
}

/**
 * Returns a list of all available default locale names
 *
 * @return List of all available default locale names indexed by region id.
 */
export function getAllDefaultLocaleNames(): IRegionIdProperties<Locale> {
  const allLocales = getAllLocales();
  const allLocaleKeys = Object.keys(allLocales);

  const defaultLocaleNames = <IRegionIdProperties<Locale>>Object.assign(
    {},
    ...allLocaleKeys.map(regionId => ({
      [regionId]: getDefaultLocaleNameForRegionId(regionId),
    })),
  );

  return defaultLocaleNames;
}