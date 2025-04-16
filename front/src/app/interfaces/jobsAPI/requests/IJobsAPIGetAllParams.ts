interface IJobsAPIGetAllParams{
    accesTravailleurHandicape: boolean; // true, false, or undefined (Not Set)
    appellation: number;                // e.g., "38444"
    codeNAF: string;                    // e.g., "78.20Z"
    codeROME: `${Letter}${number}`[];                   // e.g., "D1102,D1104,D1108"
    commune: number[];                    // e.g., "33063,31555"
    departement: number[];                // e.g., "33,31"
    distance: number;                   // e.g., 10
    domaine: `${Letter}${number}`;                    // e.g., "G17"
    dureeContratMax: number;            // e.g., 24
    dureeContratMin: number;            // e.g., 0.5
    dureeHebdo: number;                 // e.g., 1
    dureeHebdoMax: number;              // e.g., 2430
    dureeHebdoMin: number;              // e.g., 800
    entreprisesAdaptees: boolean;       // true, false, or undefined (Not Set)
    experience: number;                 // e.g., 2
    experienceExigence: Letter;         // e.g., "D"
    grandDomaine: `${Letter}${number}`;               // e.g., "M16"
    inclureLimitrophes: boolean;        // true, false, or undefined (Not Set)
    maxCreationDate: string;            // ISO date string, e.g., "2022-04-15T07:18:25Z"
    minCreationDate: string;            // ISO date string, e.g., "2022-03-25T14:52:00Z"
    modeSelectionPartenaires: string;   // e.g., "INCLUS"
    motsCles: string[];                   // e.g., "boulanger,patissier"
    natureContrat: string;              // e.g., "E1"
    niveauFormation: string;            // e.g., "NV3"
    offresMRS: boolean;                 // true, false, or undefined (Not Set)
    offresManqueCandidats: boolean;     // true, false, or undefined (Not Set)
    origineOffre: number;               // e.g., "1"
    partenaires: string;                // e.g., "PARTENAIRE1"
    paysContinent: number              // e.g., "99127"
    periodeSalaire: Letter;             // e.g., "M"
    permis: Letter;                     // e.g., "B"
    publieeDepuis: 1 | 3 | 7 | 14 | 31;              // e.g., 7
    qualification: string;              // e.g., "9"
    range: `${number}-${number}`;                      // e.g., "0-49"
    region: number;                     // e.g., "75"
    salaireMin: number;                 // e.g., 1400
    secteurActivite: number[];            // e.g., "01,02"
    sort: number;                       // e.g., "1"
    tempsPlein: boolean;                // true, false, or undefined (Not Set)
    theme: number;                      // e.g., "12"
    typeContrat: string;                // e.g., "CDI" 
}


export type OptionalJobsAPIGetAllParams = Partial<IJobsAPIGetAllParams>

type Letter = 
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M'
  | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

/*
params
accesTravailleurHandicape
:
Not SetFalseTrue

select an option
appellation
:
example: 38444
codeNAF
:
example: 78.20Z
codeROME
:
example: D1102,D1104,D1108
commune
:
example: 33063,31555
departement
:
example: 33,31
distance
:
example: 10
domaine
:
example: G17
dureeContratMax
:
example: 24
dureeContratMin
:
example: 0.5
dureeHebdo
:
example: 1
dureeHebdoMax
:
example: 2430
dureeHebdoMin
:
example: 800
entreprisesAdaptees
:
Not SetFalseTrue

select an option
experience
:
example: 2
experienceExigence
:
example: D
grandDomaine
:
example: M16
inclureLimitrophes
:
Not SetFalseTrue

select an option
maxCreationDate
:
example: 2022-04-15T07:18:25Z
minCreationDate
:
example: 2022-03-25T14:52:00Z
modeSelectionPartenaires
:
example: INCLUS
motsCles
:
example: boulanger,patissier
natureContrat
:
example: E1
niveauFormation
:
example: NV3
offresMRS
:
Not SetFalseTrue

select an option
offresManqueCandidats
:
Not SetFalseTrue

select an option
origineOffre
:
example: 1
partenaires
:
example: PARTENAIRE1
paysContinent
:
example: 99127
periodeSalaire
:
example: M
permis
:
example: B
publieeDepuis
:
example: 7
qualification
:
example: 9
range
:
example: 0-49
region
:
example: 75
salaireMin
:
example: 1400
secteurActivite
:
example: 01,02
sort
:
example: 1
tempsPlein
:
Not SetFalseTrue

select an option
theme
:
example: 12
typeContrat
:
example: CDI
Authorization*
:
*/
