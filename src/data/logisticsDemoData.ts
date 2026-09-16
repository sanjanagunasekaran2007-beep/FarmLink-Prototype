import { 
  LogisticsDeliveryItem, 
  LogisticsProfileData, 
  LogisticsNotificationItem 
} from '@/types';

export const initialLogisticsProfile: LogisticsProfileData = {
  driverName: 'Arun Kumar',
  companyName: 'Kaveri Agri-Freight & Rural Logistics',
  serviceArea: 'Tamil Nadu & Southern Karnataka Corridors',
  mobile: '+91 98450 12345',
  email: 'arun.logistics@kaverifreight.demo',
  vehicleType: '3.5T Insulated Reefer Van (Air-Suspension)',
  vehicleNo: 'TN-23-AX-8942',
  drivingLicenseNo: 'DL-TN23-201800492',
  availabilityStatus: 'On Duty',
  preferredLanguage: 'English',
  experienceYears: 8,
  totalDeliveriesCompleted: 342,
  onTimeRating: '99.2%',
  preferredCorridors: [
    'NH-48 Chennai — Kanchipuram — Vellore',
    'NH-44 Bengaluru — Hosur — Dharmapuri',
    'NH-45 Chennai — Villupuram — Trichy'
  ]
};

export const initialLogisticsDeliveries: LogisticsDeliveryItem[] = [
  {
    id: 'dl-001',
    deliveryCode: 'FL-DL-001',
    orderCode: 'FL-ORD-2026-891',
    harvestRef: 'FL-2026-001',
    produceName: 'Fresh Tomatoes (Grade A)',
    category: 'Vegetables',
    quantity: 500,
    unit: 'kg',
    packagingType: '20 Ventilated Plastic Crates (25kg each)',
    
    // Pickup Info
    farmerName: 'Murugan K. (Demo Green Farm)',
    farmerPhone: '+91 94431 87621',
    pickupLocation: 'Kanchipuram Farmer Collection Centre',
    pickupAddress: 'Plot 14, APMC Rural Collection Yard, Walajabad Road, Kanchipuram, TN 631502',
    pickupDate: '16 Sep 2026',
    pickupTime: '09:30 AM',
    pickupInstructions: 'Enter through Gate 2. Produce is pre-sorted in red crates with lot batch tags attached.',
    
    // Dropoff Info
    buyerName: 'FreshMart Agro Wholesale Ltd.',
    buyerPhone: '+91 98402 33441',
    deliveryLocation: 'Chennai Wholesale Market (Koyambedu)',
    deliveryAddress: 'Bay C-12, Periyar Vegetable Market, Koyambedu, Chennai, TN 600107',
    expectedDate: '16 Sep 2026',
    expectedTime: '12:45 PM',
    deliveryInstructions: 'Unload at Cold Dock 3. Inspect digital seal tag with receiving supervisor Mr. Ramesh.',
    
    // Assignment
    logisticsPartner: 'Kaveri Agri-Freight',
    vehicleType: '3.5T Insulated Reefer',
    vehicleNo: 'TN-23-AX-8942',
    driverName: 'Arun Kumar',
    driverPhone: '+91 98450 12345',
    
    status: 'Assigned',
    assignedDate: '16 Sep 2026, 07:15 AM',
    
    timeline: [
      {
        id: 't-1',
        stage: 'Assigned',
        title: 'Delivery Order Assigned',
        timestamp: '16 Sep 2026, 07:15 AM',
        description: 'Assigned to driver Arun Kumar (TN-23-AX-8942) via Mandi Dispatch Engine.',
        statusBadge: 'Assigned',
        isCompleted: true,
        isCurrent: true
      },
      {
        id: 't-2',
        stage: 'Pickup Pending',
        title: 'En Route to Collection Centre',
        timestamp: 'Expected: 09:15 AM',
        description: 'Vehicle scheduled to arrive at Kanchipuram Collection Yard.',
        statusBadge: 'Upcoming',
        isCompleted: false
      },
      {
        id: 't-3',
        stage: 'Picked Up',
        title: 'Produce Loading & Quality Check',
        timestamp: 'Expected: 09:45 AM',
        description: 'Inspect crate seals and log initial temperature reading.',
        statusBadge: 'Upcoming',
        isCompleted: false
      },
      {
        id: 't-4',
        stage: 'In Transit',
        title: 'Highway Transit (NH-48)',
        timestamp: 'Expected: 10:15 AM',
        description: 'Direct highway dispatch towards Chennai Wholesale Hub.',
        statusBadge: 'Upcoming',
        isCompleted: false
      },
      {
        id: 't-5',
        stage: 'Delivered',
        title: 'Buyer Handover & POD Verification',
        timestamp: 'Expected: 12:45 PM',
        description: 'Produce unload, weighment cross-check, and electronic POD signoff.',
        statusBadge: 'Upcoming',
        isCompleted: false
      }
    ],
    
    routeInfo: {
      pickupLocation: 'Kanchipuram Collection Centre',
      intermediateStop: 'Sriperumbudur Toll Waypoint',
      dropoffLocation: 'Chennai Wholesale Market (Koyambedu)',
      approxDistanceKm: 78,
      estimatedTravelTime: '2 hours 15 minutes',
      routeStatus: 'NH-48 Expressway • Normal Traffic Flow',
      highwayCorridor: 'NH-48 Chennai-Bengaluru Highway',
      waypoints: [
        {
          name: 'Kanchipuram APMC Rural Hub',
          type: 'pickup',
          address: 'Walajabad Road, Kanchipuram',
          contactPerson: 'Murugan K. (Farmer Coordinator)',
          contactPhone: '+91 94431 87621',
          eta: '09:30 AM',
          completed: false,
          notes: 'Pre-stacked in 20 crates at Bay 1'
        },
        {
          name: 'Sriperumbudur Quality Toll Point',
          type: 'hub',
          address: 'NH-48 Transit Hub, Sriperumbudur',
          contactPerson: 'Agri-Corridor Checkpoint',
          eta: '11:00 AM',
          completed: false,
          notes: 'Green-corridor agricultural transit pass active'
        },
        {
          name: 'Chennai Koyambedu Mandi',
          type: 'dropoff',
          address: 'Cold Dock 3, Periyar Market, Chennai',
          contactPerson: 'Ramesh (Receiving Manager)',
          contactPhone: '+91 98402 33441',
          eta: '12:45 PM',
          completed: false,
          notes: 'Unload bay reserved with pallet jack'
        }
      ],
      isDemoData: true
    },
    isDemoData: true
  },
  
  {
    id: 'dl-002',
    deliveryCode: 'FL-DL-002',
    orderCode: 'FL-ORD-2026-774',
    harvestRef: 'FL-2026-002',
    produceName: 'Premium Bellary Onions (Grade A)',
    category: 'Vegetables',
    quantity: 800,
    unit: 'kg',
    packagingType: '32 Breathable Gunny Jute Sacks (25kg each)',
    
    // Pickup Info
    farmerName: 'Soundararajan V. (Demo Valley Farm)',
    farmerPhone: '+91 98421 65432',
    pickupLocation: 'Tiruvallur FPO Collection Centre',
    pickupAddress: 'Shed 4, Farmer Producer Organisation Hub, Poonamallee High Rd, Tiruvallur, TN 602001',
    pickupDate: '16 Sep 2026',
    pickupTime: '11:00 AM',
    pickupInstructions: 'Moisture level certified below 12%. Moisture tags placed on top layers.',
    
    // Dropoff Info
    buyerName: 'Ambattur Retail Distribution Centre',
    buyerPhone: '+91 98411 90871',
    deliveryLocation: 'Ambattur Industrial Estate Hub',
    deliveryAddress: 'Warehouse 8B, 3rd Main Road, Ambattur IE, Chennai, TN 600058',
    expectedDate: '16 Sep 2026',
    expectedTime: '01:30 PM',
    deliveryInstructions: 'Stack onto wooden pallets in dry storage zone B.',
    
    // Assignment
    logisticsPartner: 'Kaveri Agri-Freight',
    vehicleType: '3.5T Insulated Reefer',
    vehicleNo: 'TN-23-AX-8942',
    driverName: 'Arun Kumar',
    driverPhone: '+91 98450 12345',
    
    status: 'In Transit',
    assignedDate: '16 Sep 2026, 08:30 AM',
    
    timeline: [
      {
        id: 't-201',
        stage: 'Assigned',
        title: 'Delivery Order Assigned',
        timestamp: '16 Sep 2026, 08:30 AM',
        description: 'Trip manifest registered for 800kg onion consignment.',
        statusBadge: 'Assigned',
        isCompleted: true
      },
      {
        id: 't-202',
        stage: 'Pickup Pending',
        title: 'Reached Tiruvallur FPO',
        timestamp: '16 Sep 2026, 10:45 AM',
        description: 'Vehicle parked at Loading Bay 2.',
        statusBadge: 'Completed',
        isCompleted: true
      },
      {
        id: 't-203',
        stage: 'Picked Up',
        title: '32 Sacks Loaded & Verified',
        timestamp: '16 Sep 2026, 11:20 AM',
        description: 'Weight ticket #TL-4409 generated and confirmed by FPO lead.',
        statusBadge: 'Completed',
        isCompleted: true
      },
      {
        id: 't-204',
        stage: 'In Transit',
        title: 'In Transit to Ambattur Hub',
        timestamp: '16 Sep 2026, 11:35 AM',
        description: 'Vehicle currently traversing CTH Road at 48 km/h.',
        statusBadge: 'Active',
        isCompleted: true,
        isCurrent: true
      },
      {
        id: 't-205',
        stage: 'Delivered',
        title: 'Final Handover to Buyer',
        timestamp: 'Expected: 01:30 PM',
        description: 'Delivery verification and receipt acknowledgement pending.',
        statusBadge: 'Upcoming',
        isCompleted: false
      }
    ],
    
    routeInfo: {
      pickupLocation: 'Tiruvallur FPO Centre',
      intermediateStop: 'Avadi Ring Road Junction',
      dropoffLocation: 'Ambattur Distribution Hub',
      approxDistanceKm: 45,
      estimatedTravelTime: '1 hour 20 minutes',
      routeStatus: 'Chennai-Tiruvallur High Road • Moderate Traffic',
      highwayCorridor: 'SH-205 / CTH Corridor',
      waypoints: [
        {
          name: 'Tiruvallur FPO Aggregation Yard',
          type: 'pickup',
          address: 'Poonamallee High Rd, Tiruvallur',
          contactPerson: 'Soundararajan V. (FPO In-charge)',
          contactPhone: '+91 98421 65432',
          eta: '11:00 AM',
          completed: true,
          notes: '32 sacks loaded and strapped'
        },
        {
          name: 'Avadi Outer Ring Junction',
          type: 'hub',
          address: 'ORR Toll Node, Avadi',
          eta: '12:15 PM',
          completed: false,
          notes: 'Bypassing local town market congestion'
        },
        {
          name: 'Ambattur Retail Distribution Warehouse',
          type: 'dropoff',
          address: 'Warehouse 8B, 3rd Main Rd, Ambattur',
          contactPerson: 'Suresh Menon (Hub Supervisor)',
          contactPhone: '+91 98411 90871',
          eta: '01:30 PM',
          completed: false,
          notes: 'Receiving dock 2 open until 4:00 PM'
        }
      ],
      isDemoData: true
    },
    isDemoData: true
  },
  
  {
    id: 'dl-003',
    deliveryCode: 'FL-DL-003',
    orderCode: 'FL-ORD-2026-618',
    harvestRef: 'FL-2026-003',
    produceName: 'Fresh Jyoti Potatoes (Grade B)',
    category: 'Vegetables',
    quantity: 300,
    unit: 'kg',
    packagingType: '12 Heavy-Duty Poly-Woven Sacks (25kg each)',
    
    // Pickup Info
    farmerName: 'Palaniammal R. (Demo Roots Farm)',
    farmerPhone: '+91 97890 23412',
    pickupLocation: 'Vellore Farm Cluster',
    pickupAddress: 'Katpadi Agro Aggregation Shed, Katpadi Road, Vellore, TN 632006',
    pickupDate: '15 Sep 2026',
    pickupTime: '02:30 PM',
    pickupInstructions: 'Tubers dry-brushed and sorted by size class.',
    
    // Dropoff Info
    buyerName: 'Southern Star Caterers & Institutional Foods',
    buyerPhone: '+91 98401 55670',
    deliveryLocation: 'Chennai Buyer Central Warehouse',
    deliveryAddress: 'Facility 4, Madhavaram Cold Storage Complex, Chennai, TN 600060',
    expectedDate: '15 Sep 2026',
    expectedTime: '06:15 PM',
    deliveryInstructions: 'Direct intake into Ambient Storage Cell #2.',
    
    // Assignment
    logisticsPartner: 'Kaveri Agri-Freight',
    vehicleType: '3.5T Insulated Reefer',
    vehicleNo: 'TN-23-AX-8942',
    driverName: 'Arun Kumar',
    driverPhone: '+91 98450 12345',
    
    status: 'Delivered',
    assignedDate: '15 Sep 2026, 11:00 AM',
    completedDate: '15 Sep 2026, 06:10 PM',
    
    podConfirmation: {
      confirmedAt: '15 Sep 2026, 06:10 PM',
      method: 'Delivery code verified',
      verifiedCode: 'POD-8842',
      note: 'All 12 sacks received in sound condition. Weighment 301.2 kg net.',
      receivedBy: 'Venkatesh (Warehouse Manager)'
    },
    
    timeline: [
      {
        id: 't-301',
        stage: 'Assigned',
        title: 'Delivery Order Assigned',
        timestamp: '15 Sep 2026, 11:00 AM',
        description: 'Vellore to Chennai scheduled run.',
        statusBadge: 'Completed',
        isCompleted: true
      },
      {
        id: 't-302',
        stage: 'Pickup Pending',
        title: 'Vehicle Arrived at Katpadi Shed',
        timestamp: '15 Sep 2026, 02:15 PM',
        description: 'Pre-trip cooling verification passed.',
        statusBadge: 'Completed',
        isCompleted: true
      },
      {
        id: 't-303',
        stage: 'Picked Up',
        title: 'Produce Loaded & Seal Applied',
        timestamp: '15 Sep 2026, 02:45 PM',
        description: '12 sacks loaded with security tag #FL-ST-991.',
        statusBadge: 'Completed',
        isCompleted: true
      },
      {
        id: 't-304',
        stage: 'In Transit',
        title: 'Transit via NH-48 Express Corridor',
        timestamp: '15 Sep 2026, 03:00 PM',
        description: '138 km smooth transit with 1 rest check at Ranipet.',
        statusBadge: 'Completed',
        isCompleted: true
      },
      {
        id: 't-305',
        stage: 'Delivered',
        title: 'Delivered to Madhavaram Complex',
        timestamp: '15 Sep 2026, 06:10 PM',
        description: 'Buyer confirmed digital code POD-8842. Escrow payout unlocked.',
        statusBadge: 'Delivered',
        isCompleted: true,
        isCurrent: true
      }
    ],
    
    routeInfo: {
      pickupLocation: 'Vellore Katpadi Agro Cluster',
      intermediateStop: 'Ranipet Highway Quality Rest Node',
      dropoffLocation: 'Chennai Madhavaram Complex',
      approxDistanceKm: 138,
      estimatedTravelTime: '3 hours 10 minutes',
      routeStatus: 'Completed • Normal Transit Profile',
      highwayCorridor: 'NH-48 Ranipet-Chennai Corridor',
      waypoints: [
        {
          name: 'Katpadi Agro Aggregation Yard',
          type: 'pickup',
          address: 'Katpadi Road, Vellore',
          contactPerson: 'Palaniammal R.',
          eta: '02:30 PM',
          completed: true
        },
        {
          name: 'Ranipet Intermediate Node',
          type: 'hub',
          address: 'NH-48 Ranipet Toll',
          eta: '03:45 PM',
          completed: true
        },
        {
          name: 'Madhavaram Cold Storage Complex',
          type: 'dropoff',
          address: 'Facility 4, Madhavaram, Chennai',
          contactPerson: 'Venkatesh (Manager)',
          eta: '06:10 PM',
          completed: true
        }
      ],
      isDemoData: true
    },
    isDemoData: true
  },

  {
    id: 'dl-004',
    deliveryCode: 'FL-DL-004',
    orderCode: 'FL-ORD-2026-905',
    harvestRef: 'FL-2026-004',
    produceName: 'Organic Bell Peppers & Greens (Grade A)',
    category: 'Vegetables',
    quantity: 250,
    unit: 'kg',
    packagingType: '15 Insulated Crates with Thermal Liners',
    
    // Pickup Info
    farmerName: 'Krishnan G. (Green Crest Hydroponics)',
    farmerPhone: '+91 94440 91823',
    pickupLocation: 'Hosur Greenhouse Aggregation Centre',
    pickupAddress: 'SIPCOT Phase 2 Agro Zone, Hosur, TN 635126',
    pickupDate: '17 Sep 2026',
    pickupTime: '07:00 AM',
    pickupInstructions: 'Pre-cooled to 8°C. Maintain reefer unit at 6°C - 8°C during transit.',
    
    // Dropoff Info
    buyerName: 'Bengaluru Fresh Gourmet Chain',
    buyerPhone: '+91 98455 12098',
    deliveryLocation: 'Electronic City Fulfillment Center',
    deliveryAddress: 'Block 3, Tech-Park Agri Distribution Hub, Electronic City Phase 1, Bengaluru, KA 560100',
    expectedDate: '17 Sep 2026',
    expectedTime: '09:00 AM',
    deliveryInstructions: 'Dock 1 - Temperature log verification required before unloading.',
    
    // Assignment
    logisticsPartner: 'Kaveri Agri-Freight',
    vehicleType: '3.5T Insulated Reefer',
    vehicleNo: 'TN-23-AX-8942',
    driverName: 'Arun Kumar',
    driverPhone: '+91 98450 12345',
    
    status: 'Pickup Pending',
    assignedDate: '16 Sep 2026, 03:30 PM',
    
    timeline: [
      {
        id: 't-401',
        stage: 'Assigned',
        title: 'Scheduled for Tomorrow Morning',
        timestamp: '16 Sep 2026, 03:30 PM',
        description: 'Priority cold-chain consignment booked.',
        statusBadge: 'Assigned',
        isCompleted: true
      },
      {
        id: 't-402',
        stage: 'Pickup Pending',
        title: 'Pickup Scheduled at Hosur',
        timestamp: 'Tomorrow, 07:00 AM',
        description: 'Driver Arun Kumar notified for early dispatch.',
        statusBadge: 'Active',
        isCompleted: false,
        isCurrent: true
      },
      {
        id: 't-403',
        stage: 'Picked Up',
        title: 'Thermal Crates Loading',
        timestamp: 'Tomorrow, 07:30 AM',
        description: '15 temperature-monitored crates.',
        statusBadge: 'Upcoming',
        isCompleted: false
      },
      {
        id: 't-404',
        stage: 'In Transit',
        title: 'Interstate Transit via Attibele Toll',
        timestamp: 'Tomorrow, 08:00 AM',
        description: '40 km cross-border agri corridor.',
        statusBadge: 'Upcoming',
        isCompleted: false
      },
      {
        id: 't-405',
        stage: 'Delivered',
        title: 'Delivery & Cold-Chain Handover',
        timestamp: 'Tomorrow, 09:00 AM',
        description: 'Direct store delivery for morning retail shelves.',
        statusBadge: 'Upcoming',
        isCompleted: false
      }
    ],
    
    routeInfo: {
      pickupLocation: 'Hosur Greenhouse Aggregation Centre',
      intermediateStop: 'Attibele Commercial Border Node',
      dropoffLocation: 'Bengaluru Electronic City Hub',
      approxDistanceKm: 40,
      estimatedTravelTime: '1 hour 15 minutes',
      routeStatus: 'NH-44 Cross-Border Corridor • Free Flow',
      highwayCorridor: 'NH-44 Hosur-Bengaluru Expressway',
      waypoints: [
        {
          name: 'Hosur SIPCOT Agro Facility',
          type: 'pickup',
          address: 'Phase 2 Agro Zone, Hosur',
          contactPerson: 'Krishnan G.',
          eta: '07:00 AM',
          completed: false
        },
        {
          name: 'Attibele Commercial Border Post',
          type: 'hub',
          address: 'Attibele Toll Plaza, KA Border',
          eta: '07:45 AM',
          completed: false
        },
        {
          name: 'Electronic City Retail Hub',
          type: 'dropoff',
          address: 'Block 3, Tech-Park Agri Hub, Bengaluru',
          contactPerson: 'Deepak Rao',
          eta: '09:00 AM',
          completed: false
        }
      ],
      isDemoData: true
    },
    isDemoData: true
  },

  {
    id: 'dl-005',
    deliveryCode: 'FL-DL-005',
    orderCode: 'FL-ORD-2026-512',
    harvestRef: 'FL-2026-005',
    produceName: 'Robusta Golden Bananas (Grade A)',
    category: 'Fruits',
    quantity: 1200,
    unit: 'kg',
    packagingType: '48 Heavy-Duty Cushioned Crates (25kg each)',
    
    // Pickup Info
    farmerName: 'Marimuthu A. (Theni Valley Orchards)',
    farmerPhone: '+91 94422 33119',
    pickupLocation: 'Theni Banana Farmers Cluster',
    pickupAddress: 'Mandi Road Cluster Yard, Periyakulam, Theni, TN 625601',
    pickupDate: '16 Sep 2026',
    pickupTime: '08:00 AM',
    pickupInstructions: 'Bananas cut at 85% maturity index for optimal ripening upon delivery.',
    
    // Dropoff Info
    buyerName: 'Madurai Central Fruit Merchants Association',
    buyerPhone: '+91 94433 88120',
    deliveryLocation: 'Madurai Mattuthavani Wholesale Fruit Market',
    deliveryAddress: 'Stall F-16 to F-19, Mattuthavani Market Complex, Madurai, TN 625007',
    expectedDate: '16 Sep 2026',
    expectedTime: '11:30 AM',
    deliveryInstructions: 'Direct unloading into Ripening Chamber 2.',
    
    // Assignment
    logisticsPartner: 'Kaveri Agri-Freight',
    vehicleType: '3.5T Insulated Reefer',
    vehicleNo: 'TN-23-AX-8942',
    driverName: 'Arun Kumar',
    driverPhone: '+91 98450 12345',
    
    status: 'Picked Up',
    assignedDate: '16 Sep 2026, 06:00 AM',
    
    timeline: [
      {
        id: 't-501',
        stage: 'Assigned',
        title: 'Delivery Manifest Created',
        timestamp: '16 Sep 2026, 06:00 AM',
        description: 'Theni to Madurai fruit transport allocation.',
        statusBadge: 'Assigned',
        isCompleted: true
      },
      {
        id: 't-502',
        stage: 'Pickup Pending',
        title: 'Vehicle Arrived at Theni Yard',
        timestamp: '16 Sep 2026, 07:45 AM',
        description: 'Loading bay cleared for 48 crates.',
        statusBadge: 'Completed',
        isCompleted: true
      },
      {
        id: 't-503',
        stage: 'Picked Up',
        title: '48 Crates Loaded & Cushioned',
        timestamp: '16 Sep 2026, 08:25 AM',
        description: 'Foam padding applied to prevent transit bruising.',
        statusBadge: 'Active',
        isCompleted: true,
        isCurrent: true
      },
      {
        id: 't-504',
        stage: 'In Transit',
        title: 'En Route to Madurai (NH-85)',
        timestamp: 'Expected: 09:00 AM',
        description: '72 km mountain foothills highway dispatch.',
        statusBadge: 'Upcoming',
        isCompleted: false
      },
      {
        id: 't-505',
        stage: 'Delivered',
        title: 'Handover at Mattuthavani Mandi',
        timestamp: 'Expected: 11:30 AM',
        description: 'Fruit quality inspection and crate counting.',
        statusBadge: 'Upcoming',
        isCompleted: false
      }
    ],
    
    routeInfo: {
      pickupLocation: 'Theni Banana Farmers Cluster',
      intermediateStop: 'Andipatti Weigh Station',
      dropoffLocation: 'Madurai Mattuthavani Fruit Market',
      approxDistanceKm: 72,
      estimatedTravelTime: '1 hour 50 minutes',
      routeStatus: 'NH-85 Kochi-Madurai Highway • Clear Roadways',
      highwayCorridor: 'NH-85 Theni-Madurai Corridor',
      waypoints: [
        {
          name: 'Theni Periyakulam Agro Yard',
          type: 'pickup',
          address: 'Mandi Road, Periyakulam, Theni',
          contactPerson: 'Marimuthu A.',
          eta: '08:00 AM',
          completed: true
        },
        {
          name: 'Andipatti Intermediate Weigh Station',
          type: 'hub',
          address: 'NH-85 Andipatti Pass',
          eta: '09:30 AM',
          completed: false
        },
        {
          name: 'Madurai Mattuthavani Market',
          type: 'dropoff',
          address: 'Mattuthavani Complex, Madurai',
          contactPerson: 'Selvam (Fruit Association)',
          eta: '11:30 AM',
          completed: false
        }
      ],
      isDemoData: true
    },
    isDemoData: true
  },

  {
    id: 'dl-006',
    deliveryCode: 'FL-DL-006',
    orderCode: 'FL-ORD-2026-409',
    harvestRef: 'FL-2026-006',
    produceName: 'Guntur Hot Green Chillies (Grade A)',
    category: 'Spices & Herbs',
    quantity: 400,
    unit: 'kg',
    packagingType: '16 Perforated Ventilation Bags (25kg each)',
    
    // Pickup Info
    farmerName: 'Dhanapal K. (Dindigul Spice Farms)',
    farmerPhone: '+91 94438 66291',
    pickupLocation: 'Dindigul Spice Terminal',
    pickupAddress: 'Shed 2, APMC Chilli Yard, Siluvathur Road, Dindigul, TN 624005',
    pickupDate: '14 Sep 2026',
    pickupTime: '01:00 PM',
    pickupInstructions: 'Moisture content strictly checked. Packed in breathable woven mesh.',
    
    // Dropoff Info
    buyerName: 'Trichy Masala & Food Exporters',
    buyerPhone: '+91 94431 77209',
    deliveryLocation: 'Trichy Gandhi Market Agro Complex',
    deliveryAddress: 'Plot 22, Spice Sector, Gandhi Market, Trichy, TN 620008',
    expectedDate: '14 Sep 2026',
    expectedTime: '04:00 PM',
    deliveryInstructions: 'Transfer directly into dehumidified warehouse bay 1.',
    
    // Assignment
    logisticsPartner: 'Kaveri Agri-Freight',
    vehicleType: '3.5T Insulated Reefer',
    vehicleNo: 'TN-23-AX-8942',
    driverName: 'Arun Kumar',
    driverPhone: '+91 98450 12345',
    
    status: 'Delivered',
    assignedDate: '14 Sep 2026, 10:00 AM',
    completedDate: '14 Sep 2026, 03:55 PM',
    
    podConfirmation: {
      confirmedAt: '14 Sep 2026, 03:55 PM',
      method: 'Manual confirmation',
      verifiedCode: 'POD-7731',
      note: 'All 16 mesh bags inspected for freshness and heat rating. Zero transit damage.',
      receivedBy: 'Subramanian (Quality Lead)'
    },
    
    timeline: [
      {
        id: 't-601',
        stage: 'Assigned',
        title: 'Spice Cargo Dispatched',
        timestamp: '14 Sep 2026, 10:00 AM',
        description: 'Dindigul to Trichy chilli route allocated.',
        statusBadge: 'Completed',
        isCompleted: true
      },
      {
        id: 't-602',
        stage: 'Pickup Pending',
        title: 'Arrived at Dindigul Yard',
        timestamp: '14 Sep 2026, 12:45 PM',
        description: 'Bags weighed and certified.',
        statusBadge: 'Completed',
        isCompleted: true
      },
      {
        id: 't-603',
        stage: 'Picked Up',
        title: '16 Ventilated Bags Loaded',
        timestamp: '14 Sep 2026, 01:15 PM',
        description: 'Loaded with proper air circulation spacing.',
        statusBadge: 'Completed',
        isCompleted: true
      },
      {
        id: 't-604',
        stage: 'In Transit',
        title: 'Transit via NH-83 Expressway',
        timestamp: '14 Sep 2026, 01:30 PM',
        description: '102 km transit via Manapparai bypass.',
        statusBadge: 'Completed',
        isCompleted: true
      },
      {
        id: 't-605',
        stage: 'Delivered',
        title: 'Delivered at Trichy Gandhi Market',
        timestamp: '14 Sep 2026, 03:55 PM',
        description: 'POD verified by buyer quality officer. Trip closed successfully.',
        statusBadge: 'Delivered',
        isCompleted: true,
        isCurrent: true
      }
    ],
    
    routeInfo: {
      pickupLocation: 'Dindigul Spice Terminal',
      intermediateStop: 'Manapparai Transit Checkpoint',
      dropoffLocation: 'Trichy Gandhi Market Agro Complex',
      approxDistanceKm: 102,
      estimatedTravelTime: '2 hours 30 minutes',
      routeStatus: 'Completed • On-Time Delivery Record',
      highwayCorridor: 'NH-83 Dindigul-Trichy Expressway',
      waypoints: [
        {
          name: 'Dindigul Chilli APMC Yard',
          type: 'pickup',
          address: 'Siluvathur Road, Dindigul',
          contactPerson: 'Dhanapal K.',
          eta: '01:00 PM',
          completed: true
        },
        {
          name: 'Manapparai Intermediate Checkpoint',
          type: 'hub',
          address: 'NH-83 Manapparai Bypass',
          eta: '02:30 PM',
          completed: true
        },
        {
          name: 'Trichy Gandhi Market Complex',
          type: 'dropoff',
          address: 'Plot 22, Spice Sector, Trichy',
          contactPerson: 'Subramanian',
          eta: '03:55 PM',
          completed: true
        }
      ],
      isDemoData: true
    },
    isDemoData: true
  }
];

export const initialLogisticsNotifications: LogisticsNotificationItem[] = [
  {
    id: 'notif-1',
    deliveryCode: 'FL-DL-001',
    title: 'New Delivery Assigned: FL-DL-001',
    message: 'You have been assigned 500 kg Fresh Tomatoes from Kanchipuram to Chennai Wholesale Market.',
    time: '25 mins ago',
    read: false,
    type: 'assigned'
  },
  {
    id: 'notif-2',
    deliveryCode: 'FL-DL-002',
    title: 'Pickup Approaching: FL-DL-002',
    message: 'Pickup scheduled at 11:00 AM at Tiruvallur FPO Centre. Farmer contact: +91 98421 65432.',
    time: '1 hour ago',
    read: false,
    type: 'pickup'
  },
  {
    id: 'notif-3',
    deliveryCode: 'FL-DL-003',
    title: 'POD Confirmed: FL-DL-003',
    message: 'Delivery code POD-8842 verified by Southern Star Caterers. Escrow payment released.',
    time: 'Yesterday',
    read: true,
    type: 'completed'
  },
  {
    id: 'notif-4',
    deliveryCode: 'FL-DL-004',
    title: 'Advance Schedule Alert: FL-DL-004',
    message: 'Cold-chain delivery scheduled for tomorrow 07:00 AM at Hosur SIPCOT Facility.',
    time: 'Yesterday',
    read: true,
    type: 'assigned'
  }
];
