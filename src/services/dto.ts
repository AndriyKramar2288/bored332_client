// ГОЛОВНА СТОРІНКА

export interface Country_MainPage {
    name: string;
    flagSrc: string;
    description: string;
    lawCount: number;
    location: {
        universe: {
            desc: string;
            name: string;
            photos: string[]   
        }
        coordinates: string;
        regions: string[];
    }
    implementations: {
        currentRate: number;
        law: { name : string };
        institute: { name : string };
    }[]
}

// СТОРІНКА ВСЕСВІТІВ

export interface Universe_LocationsPage {
    desc: string;
    name: string;
    photos: string[]   
}

// СТОРІНКА МОДЕЛЕЙ УПРАВЛІННЯ

export interface Model_ModelsPage {
  name: string;
  iconSrc: string;
  description: string; // виправив "desciption" → "description"
  law: {
    name: string;
    description: string;
  }[];
  institute: {
    name: string;
    description: string;
    requirements: { // виправив "requirments" → "requirements"
      text: string;
      format: string;
    }[];
  }[];
}

// ФОРМИ

export interface RegisterForm {
    email: string;
    password: string;
    username: string;
}

export interface CreateUniverseForm {
    desc: string;
    name: string;
    photos: string[];
}

export interface CreateModelLaw {
  name: string;
  description: string;
  text: string;
}

export interface CreateModelInstitute {
  name: string;
  description: string;
  requirements: {
    text: string;
    format: string;
  }[];
}

export interface CreateModelForm {
  name: string;
  iconSrc: string;
  description: string;
  laws: CreateModelLaw[]
  institutes: CreateModelInstitute[]
}

export interface CreateCountryForm {
  name: string;
  flagSrc: string;
  description: string;
  location: {
      universe_id: String;
      coordinates: string;
      regions: string[];
  }
}