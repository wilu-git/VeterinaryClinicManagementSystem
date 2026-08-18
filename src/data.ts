export type AppointmentStatus = 'Scheduled' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';
export type AppointmentType = 'Routine Checkup' | 'Vaccination' | 'Follow-up' | 'Surgery' | 'Dental' | 'Emergency' | 'Grooming';
export type PaymentStatus = 'Draft' | 'Unpaid' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Cancelled';
export type PrescriptionStatus = 'Draft' | 'Active' | 'Completed' | 'Cancelled';
export type Species = 'Dog' | 'Cat' | 'Bird' | 'Rabbit' | 'Hamster' | 'Other';
export type PageName =
  | 'dashboard'
  | 'appointments'
  | 'appointment-detail'
  | 'calendar'
  | 'pet-patients'
  | 'pet-profile'
  | 'owners'
  | 'owner-profile'
  | 'medical-records'
  | 'medical-record-detail'
  | 'prescriptions'
  | 'invoices'
  | 'invoice-detail'
  | 'reports'
  | 'settings';

export type Navigate = (page: PageName, params?: Record<string, string>) => void;

export interface Owner {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: 'Active' | 'Inactive';
  registeredDate: string;
}

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string;
  sex: 'Male' | 'Female';
  dateOfBirth: string;
  weight: number;
  color: string;
  microchipId?: string;
  ownerId: string;
  status: 'Active' | 'Inactive';
  age: string;
}

export interface Appointment {
  id: string;
  petId: string;
  ownerId: string;
  veterinarian: string;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  createdAt: string;
}

export interface VitalSigns {
  temperature: string;
  heartRate: string;
  respiratoryRate: string;
  weight: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  ownerId: string;
  appointmentId: string;
  veterinarian: string;
  date: string;
  chiefComplaint: string;
  subjective: string;
  objective: string;
  vitals: VitalSigns;
  assessment: string;
  plan: string;
  notes?: string;
  status: 'Draft' | 'Final';
}

export interface Medication {
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  duration: string;
  quantity: string;
  instructions?: string;
}

export interface Prescription {
  id: string;
  petId: string;
  ownerId: string;
  veterinarian: string;
  date: string;
  medications: Medication[];
  specialInstructions?: string;
  notes?: string;
  followUpDate?: string;
  status: PrescriptionStatus;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  petId: string;
  ownerId: string;
  appointmentId?: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentStatus: PaymentStatus;
}

export const owners: Owner[] = [
  { id: 'OWN-001', name: 'John Doe', phone: '+63 917 123 4567', email: 'john.doe@email.com', address: '123 Maple St, Quezon City', status: 'Active', registeredDate: '2024-01-15' },
  { id: 'OWN-002', name: 'Anna Lee', phone: '+63 918 234 5678', email: 'anna.lee@email.com', address: '456 Oak Ave, Makati City', status: 'Active', registeredDate: '2024-02-20' },
  { id: 'OWN-003', name: 'Mark Tan', phone: '+63 919 345 6789', email: 'mark.tan@email.com', address: '789 Pine Rd, Pasig City', status: 'Active', registeredDate: '2024-03-10' },
  { id: 'OWN-004', name: 'Sarah Kim', phone: '+63 920 456 7890', email: 'sarah.kim@email.com', address: '321 Elm St, Taguig City', status: 'Active', registeredDate: '2024-04-05' },
  { id: 'OWN-005', name: 'Roberto Cruz', phone: '+63 921 567 8901', email: 'roberto.cruz@email.com', address: '654 Birch Ln, Mandaluyong', status: 'Inactive', registeredDate: '2024-01-28' },
  { id: 'OWN-006', name: 'Maria Santos', phone: '+63 922 678 9012', email: 'maria.santos@email.com', address: '987 Cedar Dr, Parañaque', status: 'Active', registeredDate: '2024-05-12' },
];

export const pets: Pet[] = [
  { id: 'PET-245', name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', sex: 'Male', dateOfBirth: '2021-03-15', weight: 28.5, color: 'Golden', microchipId: 'MC-982000123456', ownerId: 'OWN-001', status: 'Active', age: '3 years' },
  { id: 'PET-246', name: 'Max', species: 'Dog', breed: 'German Shepherd', sex: 'Male', dateOfBirth: '2019-07-22', weight: 32.0, color: 'Black & Tan', microchipId: 'MC-982000234567', ownerId: 'OWN-002', status: 'Active', age: '5 years' },
  { id: 'PET-247', name: 'Luna', species: 'Cat', breed: 'Persian', sex: 'Female', dateOfBirth: '2022-01-10', weight: 4.2, color: 'White', ownerId: 'OWN-003', status: 'Active', age: '2 years' },
  { id: 'PET-248', name: 'Mochi', species: 'Dog', breed: 'Shih Tzu', sex: 'Female', dateOfBirth: '2020-09-05', weight: 6.8, color: 'Brown & White', ownerId: 'OWN-004', status: 'Active', age: '4 years' },
  { id: 'PET-249', name: 'Zeus', species: 'Dog', breed: 'Labrador Retriever', sex: 'Male', dateOfBirth: '2018-11-30', weight: 35.0, color: 'Black', microchipId: 'MC-982000456789', ownerId: 'OWN-005', status: 'Inactive', age: '6 years' },
  { id: 'PET-250', name: 'Cleo', species: 'Cat', breed: 'Siamese', sex: 'Female', dateOfBirth: '2023-02-14', weight: 3.8, color: 'Cream & Brown', ownerId: 'OWN-006', status: 'Active', age: '1 year' },
  { id: 'PET-251', name: 'Rocky', species: 'Dog', breed: 'Beagle', sex: 'Male', dateOfBirth: '2021-06-20', weight: 12.5, color: 'Tricolor', ownerId: 'OWN-001', status: 'Active', age: '3 years' },
];

export const appointments: Appointment[] = [
  { id: 'APT-2026-001', petId: 'PET-245', ownerId: 'OWN-001', veterinarian: 'Dr. Jane Smith', date: '2026-08-18', time: '09:00', type: 'Routine Checkup', status: 'Confirmed', reason: 'Annual wellness exam and vaccination update', createdAt: '2026-08-10' },
  { id: 'APT-2026-002', petId: 'PET-246', ownerId: 'OWN-002', veterinarian: 'Dr. Ramon Cruz', date: '2026-08-18', time: '10:30', type: 'Vaccination', status: 'Completed', reason: 'Annual rabies and distemper vaccination', notes: 'Patient was calm during procedure', createdAt: '2026-08-09' },
  { id: 'APT-2026-003', petId: 'PET-247', ownerId: 'OWN-003', veterinarian: 'Dr. Jane Smith', date: '2026-08-18', time: '11:00', type: 'Follow-up', status: 'In Progress', reason: 'Follow-up on previous ear infection treatment', createdAt: '2026-08-11' },
  { id: 'APT-2026-004', petId: 'PET-248', ownerId: 'OWN-004', veterinarian: 'Dr. Elena Reyes', date: '2026-08-18', time: '13:30', type: 'Grooming', status: 'Scheduled', reason: 'Full grooming session', createdAt: '2026-08-12' },
  { id: 'APT-2026-005', petId: 'PET-249', ownerId: 'OWN-005', veterinarian: 'Dr. Ramon Cruz', date: '2026-08-18', time: '15:00', type: 'Surgery', status: 'Scheduled', reason: 'Elective neutering surgery', createdAt: '2026-08-08' },
  { id: 'APT-2026-006', petId: 'PET-250', ownerId: 'OWN-006', veterinarian: 'Dr. Elena Reyes', date: '2026-08-17', time: '09:30', type: 'Emergency', status: 'Completed', reason: 'Sudden loss of appetite and lethargy', createdAt: '2026-08-17' },
  { id: 'APT-2026-007', petId: 'PET-251', ownerId: 'OWN-001', veterinarian: 'Dr. Jane Smith', date: '2026-08-17', time: '14:00', type: 'Dental', status: 'Cancelled', reason: 'Dental cleaning and scaling', createdAt: '2026-08-05' },
  { id: 'APT-2026-008', petId: 'PET-245', ownerId: 'OWN-001', veterinarian: 'Dr. Ramon Cruz', date: '2026-08-15', time: '10:00', type: 'Follow-up', status: 'No Show', reason: 'Post-operative check', createdAt: '2026-08-01' },
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: 'MR-2026-001',
    petId: 'PET-245',
    ownerId: 'OWN-001',
    appointmentId: 'APT-2026-002',
    veterinarian: 'Dr. Jane Smith',
    date: '2026-08-10',
    chiefComplaint: 'Annual wellness exam and vaccination update',
    subjective: 'Owner reports pet has been eating well and is active. No vomiting, diarrhea, or coughing observed at home. Pet has been scratching ears occasionally.',
    objective: 'Alert and responsive. Body condition score 5/9. Coat is clean and shiny. Eyes and ears appear normal. Mild tartar buildup on molar teeth.',
    vitals: { temperature: '38.5°C', heartRate: '88 bpm', respiratoryRate: '22 bpm', weight: '28.5 kg' },
    assessment: 'Healthy adult dog. Due for annual vaccinations. Mild dental tartar - monitor and consider dental cleaning.',
    plan: 'Administer DA2PP and Rabies vaccines. Schedule dental cleaning in 3 months. Continue current diet and exercise regimen.',
    notes: 'Owner was advised to bring pet back if ear scratching worsens. Next annual exam due August 2027.',
    status: 'Final',
  },
  {
    id: 'MR-2026-002',
    petId: 'PET-247',
    ownerId: 'OWN-003',
    appointmentId: 'APT-2026-003',
    veterinarian: 'Dr. Ramon Cruz',
    date: '2026-08-05',
    chiefComplaint: 'Ear infection - otitis externa',
    subjective: 'Owner reports cat has been shaking head and scratching left ear for 3 days. Dark discharge noted in ear canal.',
    objective: 'Left ear: erythematous, malodorous dark brown discharge. Right ear: normal. Cytology: cocci and Malassezia organisms.',
    vitals: { temperature: '38.9°C', heartRate: '180 bpm', respiratoryRate: '28 bpm', weight: '4.2 kg' },
    assessment: 'Otitis externa, left ear - mixed bacterial and yeast infection.',
    plan: 'Clean ears with Epi-Otic. Apply Otomax ointment BID x 7 days. Recheck in 2 weeks.',
    status: 'Final',
  },
  {
    id: 'MR-2026-003',
    petId: 'PET-250',
    ownerId: 'OWN-006',
    appointmentId: 'APT-2026-006',
    veterinarian: 'Dr. Elena Reyes',
    date: '2026-08-17',
    chiefComplaint: 'Sudden loss of appetite and lethargy',
    subjective: 'Owner reports cat has not eaten for 2 days and is hiding. Drinking water normally. No vomiting or diarrhea.',
    objective: 'Quiet, alert. Mild dehydration (~5%). Abdomen soft, no pain on palpation. Slight hepatomegaly on palpation.',
    vitals: { temperature: '37.8°C', heartRate: '160 bpm', respiratoryRate: '24 bpm', weight: '3.6 kg' },
    assessment: 'Hepatic lipidosis suspected. Rule out FIV/FeLV and other systemic illness.',
    plan: 'CBC, chemistry panel, FIV/FeLV test ordered. IV fluids administered. Nutritional support - appetite stimulant prescribed. Recheck in 48 hours.',
    status: 'Final',
  },
];

export const prescriptions: Prescription[] = [
  {
    id: 'RX-2026-001',
    petId: 'PET-247',
    ownerId: 'OWN-003',
    veterinarian: 'Dr. Ramon Cruz',
    date: '2026-08-05',
    medications: [
      { name: 'Otomax Ointment', dosage: '4 drops', route: 'Otic (Left Ear)', frequency: 'Twice daily', duration: '7 days', quantity: '1 tube (14g)', instructions: 'Clean ear before application' },
      { name: 'Epi-Otic Ear Cleaner', dosage: 'As directed', route: 'Otic', frequency: 'Once daily', duration: '7 days', quantity: '1 bottle', instructions: 'Use before Otomax application' },
    ],
    specialInstructions: 'Avoid water in ears during treatment. Return for recheck in 2 weeks.',
    status: 'Active',
    followUpDate: '2026-08-19',
  },
  {
    id: 'RX-2026-002',
    petId: 'PET-250',
    ownerId: 'OWN-006',
    veterinarian: 'Dr. Elena Reyes',
    date: '2026-08-17',
    medications: [
      { name: 'Mirtazapine', dosage: '1.875 mg', route: 'Oral', frequency: 'Every 3 days', duration: '14 days', quantity: '5 tablets', instructions: 'Appetite stimulant - give with or without food' },
      { name: 'Cerenia (Maropitant)', dosage: '8 mg', route: 'Oral', frequency: 'Once daily', duration: '5 days', quantity: '5 tablets', instructions: 'Anti-nausea medication - give 1 hour before feeding' },
    ],
    specialInstructions: 'Force feed if cat refuses to eat. Monitor appetite closely. Contact clinic immediately if condition worsens.',
    status: 'Active',
    followUpDate: '2026-08-19',
  },
  {
    id: 'RX-2026-003',
    petId: 'PET-245',
    ownerId: 'OWN-001',
    veterinarian: 'Dr. Jane Smith',
    date: '2026-07-20',
    medications: [
      { name: 'Amoxicillin', dosage: '250 mg', route: 'Oral', frequency: 'Twice daily', duration: '10 days', quantity: '20 tablets', instructions: 'Give with food' },
    ],
    status: 'Completed',
  },
];

export const invoices: Invoice[] = [
  {
    id: 'INV-2026-451',
    petId: 'PET-245',
    ownerId: 'OWN-001',
    appointmentId: 'APT-2026-001',
    date: '2026-08-18',
    items: [
      { description: 'Consultation Fee', quantity: 1, unitPrice: 500, amount: 500 },
      { description: 'DA2PP Vaccine', quantity: 1, unitPrice: 800, amount: 800 },
      { description: 'Rabies Vaccine', quantity: 1, unitPrice: 350, amount: 350 },
    ],
    subtotal: 1650,
    discount: 0,
    total: 1650,
    paymentStatus: 'Unpaid',
  },
  {
    id: 'INV-2026-450',
    petId: 'PET-247',
    ownerId: 'OWN-003',
    appointmentId: 'APT-2026-003',
    date: '2026-08-05',
    items: [
      { description: 'Consultation Fee', quantity: 1, unitPrice: 500, amount: 500 },
      { description: 'Ear Cytology', quantity: 1, unitPrice: 400, amount: 400 },
      { description: 'Otomax Ointment', quantity: 1, unitPrice: 380, amount: 380 },
      { description: 'Epi-Otic Ear Cleaner', quantity: 1, unitPrice: 220, amount: 220 },
    ],
    subtotal: 1500,
    discount: 150,
    total: 1350,
    paymentStatus: 'Paid',
  },
  {
    id: 'INV-2026-449',
    petId: 'PET-250',
    ownerId: 'OWN-006',
    appointmentId: 'APT-2026-006',
    date: '2026-08-17',
    items: [
      { description: 'Emergency Consultation', quantity: 1, unitPrice: 800, amount: 800 },
      { description: 'IV Fluid Administration', quantity: 1, unitPrice: 1200, amount: 1200 },
      { description: 'CBC & Chemistry Panel', quantity: 1, unitPrice: 1500, amount: 1500 },
      { description: 'FIV/FeLV Test', quantity: 1, unitPrice: 600, amount: 600 },
      { description: 'Mirtazapine', quantity: 5, unitPrice: 80, amount: 400 },
      { description: 'Cerenia Tablets', quantity: 5, unitPrice: 120, amount: 600 },
    ],
    subtotal: 5100,
    discount: 0,
    total: 5100,
    paymentStatus: 'Partially Paid',
  },
  {
    id: 'INV-2026-448',
    petId: 'PET-246',
    ownerId: 'OWN-002',
    appointmentId: 'APT-2026-002',
    date: '2026-08-18',
    items: [
      { description: 'Consultation Fee', quantity: 1, unitPrice: 500, amount: 500 },
      { description: 'Rabies Vaccine', quantity: 1, unitPrice: 350, amount: 350 },
      { description: 'Distemper Vaccine', quantity: 1, unitPrice: 650, amount: 650 },
    ],
    subtotal: 1500,
    discount: 0,
    total: 1500,
    paymentStatus: 'Paid',
  },
  {
    id: 'INV-2026-447',
    petId: 'PET-248',
    ownerId: 'OWN-004',
    date: '2026-07-28',
    items: [
      { description: 'Grooming - Full Package', quantity: 1, unitPrice: 1200, amount: 1200 },
    ],
    subtotal: 1200,
    discount: 0,
    total: 1200,
    paymentStatus: 'Overdue',
  },
];

export const getOwner = (id: string) => owners.find((o) => o.id === id);
export const getPet = (id: string) => pets.find((p) => p.id === id);
export const getAppointment = (id: string) => appointments.find((a) => a.id === id);
export const getMedicalRecord = (id: string) => medicalRecords.find((r) => r.id === id);
export const getPetAppointments = (petId: string) => appointments.filter((a) => a.petId === petId);
export const getPetMedicalRecords = (petId: string) => medicalRecords.filter((r) => r.petId === petId);
export const getOwnerPets = (ownerId: string) => pets.filter((p) => p.ownerId === ownerId);
export const getOwnerAppointments = (ownerId: string) => appointments.filter((a) => a.ownerId === ownerId);
export const getOwnerInvoices = (ownerId: string) => invoices.filter((i) => i.ownerId === ownerId);
export const getPetPrescriptions = (petId: string) => prescriptions.filter((p) => p.petId === petId);
