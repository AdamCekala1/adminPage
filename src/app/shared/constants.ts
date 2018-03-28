import {
    intensityType,
    periodType,
    bodyType
} from './enums/calculator-calories-form.enums';

export class CONSTANTS {
  public static ROUTING_URL = {
    CALCULATOR: 'calculator',
    DIET: 'diet',
    DIET_LOG: 'diet-log',
    IGREDIENTS: 'ingredients'
  };

  public static MAX_IMAGES_SIZE = 500000;

  // public static PRODUCTS_TYPE = {
  //   [typesOfProducts.DRINIKS]: 'napoje i słodycze',
  //   [typesOfProducts.FASTFOOD]: 'fast food',
  //   [typesOfProducts.FATS]: 'tłuszcze',
  //   [typesOfProducts.FUNCIONAL]: 'odżywki',
  //   [typesOfProducts.GRAINS]: 'produkty zbożowe',
  //   [typesOfProducts.MEALS]: 'dania gotowe',
  //   [typesOfProducts.MEAT]: 'mięso i ryby',
  //   [typesOfProducts.NUTS]: 'orzechy i nasiona',
  //   [typesOfProducts.OTHERS]: 'inny',
  //   [typesOfProducts.PROTEINS]: 'nabiał i jaja',
  //   [typesOfProducts.VEGETABLES]: 'warzywa i owoce'
  // };

  public static KCAL = {
    PER_MINUTE: {
      AERO: {
        [intensityType.LIGHT]: 5,
        [intensityType.MEDIUM]: 7.5,
        [intensityType.HARD]: 10
      },
      GYM: {
        [intensityType.LIGHT]: 7,
        [intensityType.MEDIUM]: 8,
        [intensityType.HARD]: 9
      }
    },
    ADDITIONAL: {
      AERO: { // kcal
        [intensityType.LIGHT]: 5,
        [intensityType.MEDIUM]: 35,
        [intensityType.HARD]: 180
      },
      GYM: { // percent
        [intensityType.LIGHT]: 4,
        [intensityType.MEDIUM]: 5.5,
        [intensityType.HARD]: 7
      }
    }
  };

  public static periodsReadable = {
    readableString: {
      [periodType.DAY]: 'Dziennie',
      [periodType.WEEK]: 'Tygodniowo',
      [periodType.MONTH]: 'Miesięcznie'
    },
    readableNumber: {
      [periodType.DAY]: 1,
      [periodType.WEEK]: 7,
      [periodType.MONTH]: 30
    }
  };

  public static bodyType = {
    readableString: {
      [bodyType.EKTO]: 'Ektomorfik',
      [bodyType.ENDO]: 'Endomorfik',
      [bodyType.MEZO]: 'Mezomorfik'
    },
    kcal: {
      [bodyType.EKTO]: 800,
      [bodyType.ENDO]: 300,
      [bodyType.MEZO]: 450
    }
  };

  public static intensitTypeReadable = {
    [intensityType.LIGHT]: 'Lekkie',
    [intensityType.MEDIUM]: 'Srednie',
    [intensityType.HARD]: 'Ciężkie',
  };

  public static REGEX = {
    NUMBER_ONLY: /^\d+$/
  };
}
