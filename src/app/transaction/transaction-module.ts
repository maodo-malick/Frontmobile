export interface Transaction
{
  id: number;
  montant: number;
  dateDepot: any;
  dateRetrait: any;
  dateAnnulation: any;
  ttc: number;
  fraisEtat: number;
  fraisSystem: number;
  fraisEnvoie: number;
  fraisRetrait: number;
}
