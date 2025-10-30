export const generalInfoFields = {
  general: [
    { label: 'Email', name: 'email', type: 'email', showOn: ['create'] },
    {
      label: 'Mot de passe',
      name: 'password',
      type: 'password',
      showOn: ['create'],
    },
    {
      label: "Nom d'entreprise",
      name: 'name',
      type: 'text',
      showOn: ['create'],
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      rows: 6,
      showOn: ['create', 'edit'],
    },
  ],
  contact: [
    {
      label: 'Téléphone',
      name: 'tel',
      type: 'text',
      showOn: ['create', 'edit'],
    },
    {
      label: 'Pays',
      name: 'country',
      type: 'text',
      showOn: ['create', 'edit'],
    },
    { label: 'Ville', name: 'city', type: 'text', showOn: ['create', 'edit'] },
    {
      label: 'Code postale',
      name: 'zip',
      type: 'text',
      showOn: ['create', 'edit'],
    },
    {
      label: 'Adresse',
      name: 'address',
      type: 'text',
      showOn: ['create', 'edit'],
    },
  ],
};
