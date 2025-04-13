export default interface IJobOffer {
    id: string;
    intitule: string;
    description: string;
    dateCreation: string;
    dateActualisation: string;
    lieuTravail: {
      libelle: string;
      latitude: number;
      longitude: number;
      codePostal: string;
      commune: string;
    };
    romeCode: string;
    romeLibelle: string;
    appellationlibelle: string;
    entreprise: {
      nom: string;
      description: string;
      entrepriseAdaptee: boolean;
    };
    typeContrat: string;
    typeContratLibelle: string;
    natureContrat: string;
    experienceExige: string;
    experienceLibelle: string;
    competences: {
      code: string;
      libelle: string;
      exigence: string;
    }[];
    salaire: {
      libelle: string;
      complement1: string;
    };
    dureeTravailLibelle: string;
    dureeTravailLibelleConverti: string;
    alternance: boolean;
    contact: {
      nom: string;
      coordonnees1: string;
      courriel: string;
      urlPostulation: string;
    };
    agence: Record<string, never>; // Assuming agence is an empty object
    nombrePostes: number;
    accessibleTH: boolean;
    qualificationCode: string;
    qualificationLibelle: string;
    codeNAF: string;
    secteurActivite: string;
    secteurActiviteLibelle: string;
    origineOffre: {
      origine: string;
      urlOrigine: string;
    };
    offresManqueCandidats: boolean;
    contexteTravail: {
      horaires: string[];
    };
}