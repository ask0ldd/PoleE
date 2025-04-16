import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import IJobOffer from '../../interfaces/jobsAPI/IJobOffer';
import { OptionalJobsAPIGetAllParams } from '../../interfaces/jobsAPI/requests/IJobsAPIGetAllParams';

@Injectable({
  providedIn: 'root'
})
export class JobsAPIService {

  private baseAPIUrl = "/jobsapi/partenaire/offresdemploi/v2/offres/"

  constructor(private httpClient : HttpClient) { }

  // retrieve a list of jobs offers matching the given params
  getAll(params ?: OptionalJobsAPIGetAllParams) : Observable<IJobOffer[]>{
    const url = this.buildUrlWithParams<OptionalJobsAPIGetAllParams | null>(
      this.baseAPIUrl,
      { domaine : 'M18', departement : [94, 75, 77], /*publieeDepuis : 31, motsCles : ['typescript'], range : '0-50'*/ },
    )
    return this.httpClient
      .get<{resultats : IJobOffer[]}>(url)
      .pipe(map(response => response.resultats))
  }

  // retrieve the job offer matching the given id
  getById(id : string) : Observable<IJobOffer>{
    return this.httpClient.get<IJobOffer>(this.baseAPIUrl+id) // !!! deal with error
  }

  // build an url including the given params
  buildUrlWithParams<T extends object | null>(baseUrl : string, params : T) : string{

    const baseAPIUrl = baseUrl?.endsWith('/') ? baseUrl : baseUrl + '/'

    if(params == null) return baseAPIUrl + 'search'

    const queryParts: string[] = [];

    for(const [key, value] of Object.entries(params)){ // better type safety than accessing value with : params[key as keyof typeof params]
      if (value === undefined || value === null) continue;
      if(Array.isArray(value)) queryParts.push(`${key}=${encodeURIComponent(value.join(','))}`)
      if(typeof value == "string" || typeof value == "number") queryParts.push(`${key}=${encodeURIComponent(value)}`)
    }

    return baseAPIUrl + 'search?' + queryParts.join("&")
  }
}

// doc : https://francetravail.io/produits-partages/catalogue/offres-emploi/documentation#/api-reference/operations/recupererListeOffre

// detail offre : https://api.francetravail.io/partenaire/offresdemploi/v2/offres/{id}

// liste des offres : https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search

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
