import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { IJobsAPIAccessTokenResponse } from '../../interfaces/jobsAPI/responses/IJobsAPIAccessTokenResponse';
import { IJobsAPIErrorResponse } from '../../interfaces/jobsAPI/responses/IJobsAPIErrorResponse';
import IJobOffer from '../../interfaces/jobsAPI/IJobOffer';

@Injectable({
  providedIn: 'root'
})
export class JobsAPIService {

  private baseAPIUrl = "/jobsapi/partenaire/offresdemploi/v2/offres/"

  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<IJobOffer[]>{
    return this.httpClient.get<{resultats : IJobOffer[]}>(this.baseAPIUrl+'search?domaine=M18&departement=94,75,77'/*+'&motsCles=sio'+'?commune=75001'*/).pipe(map(response => response.resultats)) // !!! deal with error
  }

  getById(id : string) : Observable<IJobOffer>{
    return this.httpClient.get<IJobOffer>(this.baseAPIUrl+id) // !!! deal with error
  }

}

// doc : https://francetravail.io/produits-partages/catalogue/offres-emploi/documentation#/api-reference/operations/recupererListeOffre

// detail offre : https://api.francetravail.io/partenaire/offresdemploi/v2/offres/{id}

// liste des offres : https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search

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

/* 
response :

{
  "resultats": [
    {
      "id": "048KLTP",
      "intitule": "Boulanger / Boulangère (H/F)",
      "description": "Nous rechercons un/e Boulanger/ère pour notre nouveau magasin.",
      "dateCreation": "2022-10-23T08:15:42Z",
      "dateActualisation": "2022-10-23T08:15:42Z",
      "lieuTravail": {
        "libelle": "74 - ANNECY",
        "latitude": 45.901584,
        "longitude": 6.125296,
        "codePostal": "74000",
        "commune": "74010"
      },
      "romeCode": "D1102",
      "romeLibelle": "Boulanger / Boulangère",
      "appellationlibelle": "Boulanger / Boulangère",
      "entreprise": {
        "nom": "Le boulanger austral",
        "description": "Votre nouvelle boulangerie locale",
        "logo": "https://boulanger-austral.net/logo.png",
        "url": "https://boulanger-austral.net",
        "entrepriseAdaptee": true
      },
      "typeContrat": "CDD",
      "typeContratLibelle": "CDD - 6 Mois",
      "natureContrat": "Contrat travail",
      "experienceExige": "D",
      "experienceLibelle": "Débutant accepté",
      "experienceCommentaire": "Expérience dans la vente souhaitée",
      "formations": [
        {
          "codeFormation": "21538",
          "domaineLibelle": "boulangerie",
          "niveauLibelle": "CAP, BEP et équivalents",
          "commentaire": "Mention bien souhaitée",
          "exigence": "E"
        }
      ],
      "langues": [
        {
          "libelle": "Anglais",
          "exigence": "E"
        }
      ],
      "permis": [
        {
          "libelle": "B - Véhicule léger",
          "exigence": "S"
        }
      ],
      "outilsBureautiques": "Traitement de texte",
      "competences": [
        {
          "code": "483320",
          "libelle": "Maintenir un environnement de travail propre et organisé",
          "exigence": "E"
        }
      ],
      "salaire": {
        "libelle": "Mensuel de 1923.00 Euros sur 12 mois",
        "commentaire": "Selon expérience",
        "complement1": "Véhicule de fonction",
        "complement2": "Prime de vacances"
      },
      "dureeTravailLibelle": "35H",
      "dureeTravailLibelleConverti": "Temps plein",
      "complementExercice": "Gestion de la comptabilité",
      "conditionExercice": "Travail de nuit",
      "alternance": false,
      "contact": {
        "nom": "Etienne Dupont",
        "coordonnees1": "12 impasse du caillou",
        "coordonnees2": "string",
        "coordonnees3": "string",
        "telephone": "06 12 34 56 78",
        "courriel": "etienne@boulanger-austral.net",
        "commentaire": "A contacter après 19h",
        "urlRecruteur": "https://boulanger-austral.net",
        "urlPostulation": "https://boulanger-austral.net/carrieres"
      },
      "agence": {
        "telephone": "06 12 34 56 78",
        "courriel": "agence@francetravail.fr"
      },
      "nombrePostes": 3,
      "accessibleTH": true,
      "deplacementCode": "1",
      "deplacementLibelle": "Jamais",
      "qualificationCode": "6",
      "qualificationLibelle": "Employé qualifié",
      "codeNAF": "10.71C",
      "secteurActivite": "10",
      "secteurActiviteLibelle": "Boulangerie et boulangerie-pâtisserie",
      "qualitesProfessionnelles": [
        {
          "libelle": "Faire preuve d'autonomie",
          "description": "Capacité à prendre en charge son activité sans devoir être encadré de façon continue."
        }
      ],
      "trancheEffectifEtab": "1 à 5 employés",
      "origineOffre": {
        "origine": "2",
        "urlOrigine": "https://partenaire-offre.net/boulanger-austral-46841",
        "partenaires": [
          {
            "nom": "PARTENAIRE1",
            "url": "https://partenaire-offre.net/boulanger-austral-46841",
            "logo": "https://partenaire-offre.net/logo.png"
          }
        ]
      },
      "offresManqueCandidats": true,
      "contexteTravail": {
        "horaires": "35H Travail le samedi",
        "conditionsExercice": "Port de tenue professionnelle ou d'uniforme"
      }
    }
  ],
  "filtresPossibles": [
    {
      "filtre": "natureContrat",
      "agregation": [
        {
          "valeurPossible": "E1",
          "nbResultats": 45
        }
      ]
    }
  ]
}
*/
