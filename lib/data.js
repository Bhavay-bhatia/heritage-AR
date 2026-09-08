// Heritage Data Store - Monuments, Scans, Stories & Safety Routes

export const HERITAGE_DATA = {
  // Preloaded Scanned Artifacts for WebXR Camera Demo
  scannedArtifacts: [
    {
      id: 'hampi-pillar',
      name: 'Eroded Sun Temple Pillar',
      location: 'Hampi, Karnataka, India',
      dynasty: 'Vijayanagara Empire (14th Century)',
      material: 'Weathered Granite',
      condition: '72% Surface Erosion',
      coordinates: [15.3350, 76.4600],
      thumbnail: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=600&q=80',
      description: 'A grand carved pillar from the Vitthala Temple complex depicting celestial musicians and mythical Yali creatures. Severely eroded by centuries of weathering.',
      inscriptions: 'Translated: "May the prosperity of King Devaraya II illuminate the carved halls of the sun god."',
      storyText: {
        en: "Step back 600 years to the bustling capital of Vijayanagara. As dusk settles over the Tungabhadra River, master sculptors chisel this sacred granite pillar. Each carved line echoed the chants of temple rituals. Though centuries of rain and wind have softened its edges, our 3D wireframe reveals the intricate crest of the royal emblem and celestial dancers hidden within the stone.",
        hi: "६०० वर्ष पीछे विजयनगर के वैभवशाली युग में चलें। तुंगभद्रा नदी के तट पर, महान मूर्तिकारों ने इस पवित्र ग्रेनाइट स्तंभ को तराशा। समय की धुंध ने भले ही इसके नक्श धुंधले कर दिए हों, परंतु यह ३डी डिजिटल पुनर्निर्माण इसके मूल स्वरूप और शाही मुहर को आपके समक्ष पुनर्जीवित करता है।",
        ta: "600 ஆண்டுகளுக்கு முந்தைய விஜயநகரப் பேரரசின் பொற்காலத்திற்குப் பயணிப்போம். துங்கபத்திரை ஆற்றங்கரையில் உருவான இப்புனிதமான கல் தூண், காலத்தின் மாற்றத்தால் தேய்மானம் அடைந்திருந்தாலும், நமது முப்பரிமாண தொழில்நுட்பம் இதன் பழங்கால அழகையும் சிற்ப வேலைப்பாடுகளையும் மீட்டுத் தருகிறது.",
        te: "600 ఏళ్ల నాటి విజయనగర సామ్రాజ్య వైభవంలోకి అడుగుపెట్టండి. తుంగభద్ర నదీ తీరాన శిల్పులు మలిచిన ఈ పవిత్ర స్తంభం, శతాబ్దాల వాతావరణ ప్రభావంతో అరిగిపోయినా, మన 3D వైర్‌ఫ్రేమ్ టెక్నాలజీ దీని అసలు రూప రూపాంతరాన్ని కళ్లముందు ఉంచుతుంది.",
        kn: "೬೦೦ ವರ್ಷಗಳ ಹಿಂದಿನ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ವೈಭವಕ್ಕೆ ಪಯಣಿಸಿ. ತುಂಗಭದ್ರಾ ತೀರದಲ್ಲಿ ಕಲ್ಲಿನಲ್ಲಿ ಕೆತ್ತಲಾದ ಈ ಪವಿತ್ರ ಕಂಬವು ಕಾಲಾನಂತರದಲ್ಲಿ ಸವೆದುಹೋಗಿದ್ದರೂ, ನಮ್ಮ ೩ಡಿ ತಂತ್ರಜ್ಞಾನವು ಇದರ ನೈಜ ಸೌಂದರ್ಯವನ್ನು ಮರುಸೃಷ್ಟಿಸುತ್ತದೆ.",
        bn: "৬০০ বছর পেছনে বিজয়নগর সাম্রাজ্যের সমৃদ্ধ যুগে ফিরে যান। সময় ও আবহাওয়ার ধাক্কায় এই গ্রানাইট স্তম্ভটি ক্ষয়প্রাপ্ত হলেও, আমাদের ৩ডি প্রযুক্তির মাধ্যমে এর প্রাচীন জাঁকজমক পুনরায় দৃশ্যমান হয়েছে।",
        es: "Retroceda 600 años hasta el floreciente Imperio Vijayanagara. Este pilar de granito sagrado, desgastado por siglos de viento y lluvia, cobra vida nuevamente gracias a nuestra reconstrucción holográfica en 3D.",
        fr: "Remontez 600 ans en arrière au cœur du puissant Empire Vijayanagara. Ce pilier en granite sacré, érodé par les siècles, retrouve sa splendeur d'origine grâce à notre reconstitution 3D interactive."
      },
      meshType: 'pillar',
      relatableIds: ['brihadeeswarar', 'konark-sun', 'ajanta-caves']
    },
    {
      id: 'ashoka-edict',
      name: 'Faded Ashokan Rock Edict',
      location: 'Junagadh, Gujarat, India',
      dynasty: 'Maurya Empire (250 BCE)',
      material: 'Granite Rock Inscription',
      condition: '84% Inscription Decay',
      coordinates: [21.5222, 70.4579],
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      description: 'Major Rock Edict of Emperor Ashoka inscribed in Brahmi script, decreeing non-violence, medical care for humans and animals, and moral governance.',
      inscriptions: 'Brahmi Script deciphered: "Beloved-of-the-Gods, King Piyadasi, desires that all religions reside everywhere in peace."',
      storyText: {
        en: "Imagine standing before Emperor Ashoka's royal scribes 2,200 years ago. Armed with iron chisels, they carved messages of peace and dhamma directly into raw mountain rock. Over millennia, moss and weather faded the ancient Brahmi script. Through our WebXR spectral scanner, the hidden incisions glow bright blue, unearthing Ashoka's timeless plea for harmony.",
        hi: "२२-सौ वर्ष पूर्व सम्राट अशोक के शाही शिलालेख के समक्ष खड़े हों। ब्राह्मी लिपि में उकेरे गए शांति और धर्म के संदेशों को समय की धूल ने छिपा दिया था। हमारे वेब-एक्स-आर स्कैनर से ये गुप्त रेखाएं पुनः जीवंत हो उठती हैं।",
        ta: "2200 ஆண்டுகளுக்கு முன்பு பேரரசர் அசோகரின் பிராமி எழுத்துச் சாசனங்கள் பொறிக்கப்பட்ட இப்பாறையை நமது WebXR தொழில்நுட்பம் மீண்டும் துல்லியமாக வாசித்து அதன் அமைதிச் செய்தியை வெளிப்படுத்துகிறது.",
        te: "2200 సంవత్సరాల క్రితం అశోక చక్రవర్తి బ్రాహ్మీ లిపిలో చెక్కించిన ఈ శాసనం ధర్మాన్ని, శాంతిని చాటిచెబుతుంది. మన కెమెరా స్కానర్ ఈ నిగూఢ అక్షరాలను స్పష్టంగా వెలుగులోకి తెస్తుంది.",
        kn: "೨೨೦೦ ವರ್ಷಗಳ ಹಿಂದೆ ಸಾಮ್ರಾಟ್ ಅಶೋಕರ ಬ್ರಾಹ್ಮಿ ಲಿಪಿಯ ಶಾಸನಗಳು ಕಲ್ಲಿನಲ್ಲಿ ಮೂಡಿದವು. ನಮ್ಮ ಆರ್‌ಎಕ್ಸ್ ಕ್ಯಾಮೆರಾ ತಂತ್ರಜ್ಞಾನವು ಈ ಅಳಿಸಿಹೋದ ಅಕ್ಷರಗಳನ್ನು ಮರು ಪ್ರಕಾಶಗೊಳಿಸುತ್ತದೆ.",
        bn: "২২০০ বছর পূর্বে সম্রাট অশোকের ব্রাহ্মী লিপিতে লিখিত শান্তির বাণী পুনরায় উন্মোচিত হচ্ছে আমাদের উন্নত প্রযুক্তিগত স্ক্যানারের সাহায্যে।",
        es: "Sienta la presencia del emperador Ashoka hace más de 2200 años. Las escrituras Brahmi grabadas en la roca cobran vida revelando edictos de paz y compasión.",
        fr: "Découvrez l'édit de l'empereur Ashoka vieux de 2 200 ans. L'écriture Brahmi effacée s'illumine pour révéler ses célèbres décrets de paix et d'humanisme."
      },
      meshType: 'tablet',
      relatableIds: ['sanchi-stupa', 'mahabalipuram', 'khajuraho']
    },
    {
      id: 'chola-inscription',
      name: 'Weathered Chola Inscription Slab',
      location: 'Thanjavur, Tamil Nadu, India',
      dynasty: 'Chola Dynasty (11th Century)',
      material: 'Black Basalt Relief',
      condition: '65% Text Faded',
      coordinates: [10.7828, 79.1318],
      thumbnail: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=600&q=80',
      description: 'Detailing land grants, naval victories of Rajendra Chola I, and endowments to temple dancers and grain merchants in ancient Vatteluttu script.',
      inscriptions: 'Vatteluttu translated: "To the eternal glory of Lord Shiva and the brave naval commanders who crossed the eastern seas."',
      storyText: {
        en: "Feel the ocean breeze of the 11th century as King Rajendra Chola's naval fleets returned triumphant from Maritime Southeast Asia. Royal scribes hammered this basalt slab to record maritime trade routes and naval heroics. Our wireframe mesh recovers lost depth contours, bringing ancient Tamil Vatteluttu scripts into vibrant clarity.",
        hi: "११वीं शताब्दी के चोल राजवंश की समुद्री सफलताओं की कहानी। राजा राजेंद्र चोल के काल की यह शिला लिपि प्राचीन व्यापारिक मार्गों का प्रामाणिक विवरण देती है।",
        ta: "11-ஆம் நூற்றாண்டில் ராஜேந்திர சோழனின் கடற்படை வெற்றிகளையும், தஞ்சைப் பெருவுடையார் கோயிலுக்கு வழங்கப்பட்ட நிவந்தங்களையும் விவரிக்கும் வட்டெழுத்துச் சாசனம் இது. நமது 3D தொழில்நுட்பம் இச்சாசனத்தை முழுமையாக மீட்டெடுக்கிறது.",
        te: "11వ శతాబ్దపు చోళ నావికా దళాల విజయగాథను తెలిపే శాసనం. నౌకా వాణిజ్యం మరియు తమిళ వట్టెళుత్తు లిపిని డిజిటల్ విధానంలో స్పష్టంగా చూడవచ్చు.",
        kn: "೧೧ನೇ ಶತಮಾನದ ಚೋಳ ರಾಜವಂಶದ ನೌಕಾಪಡೆಯ ಸಾಹಸಗಾಥೆಯನ್ನು ವಿವರಿಸುವ ಈ ಶಾಸನವು ನಮ್ಮ ವೈರ್‌ಫ್ರೇಮ್ ಮಾದರಿಯಿಂದ ಮರುಸೃಷ್ಟಿಯಾಗಿದೆ.",
        bn: "একাদশ শতাব্দীর চোল নৌবাহিনীর গৌরবময় বিজয়ের ইতিহাস এই তামিল খোদাইচিত্রের মাধ্যমে উন্মোচিত হয়েছে।",
        es: "Viaje a las victoriosas campañas navales del Imperio Chola en el siglo XI. Las inscripciones grabadas en basalto revelan antiguas rutas comerciales.",
        fr: "Explorez les exploits maritimes de la dynastie Chola au XIe siècle. Notre scan 3D révèle les anciennes écritures gravées dans le basalte."
      },
      meshType: 'wall',
      relatableIds: ['brihadeeswarar', 'mahabalipuram', 'hampi-pillar']
    }
  ],

  // Interactive Desktop Map Monument Locations
  mapMonuments: [
    {
      id: 'brihadeeswarar',
      name: 'Brihadeeswarar Temple',
      location: 'Thanjavur, Tamil Nadu',
      dynasty: 'Chola Dynasty (1010 CE)',
      coordinates: [10.7828, 79.1318],
      category: 'Temple Architecture',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=600&q=80',
      summary: 'UNESCO World Heritage Site built by Raja Raja Chola I. Features a 216-foot vimana tower constructed entirely of granite without mortar.',
      highlights: ['Single stone 80-ton Kumbam capstone', 'Ancient shadow-less architectural alignment', 'Vatteluttu mural inscriptions'],
      wireframeAvailable: true,
      audioStoryAvailable: true
    },
    {
      id: 'hampi-ruins',
      name: 'Hampi Sacred Ruins',
      location: 'Vijayanagara, Karnataka',
      dynasty: 'Vijayanagara Empire (1336 CE)',
      coordinates: [15.3350, 76.4600],
      category: 'Ancient City Citadel',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=600&q=80',
      summary: 'Sprawling capital of the Vijayanagara Empire along the Tungabhadra river, famed for musical stone pillars and monolithic chariots.',
      highlights: ['Vitthala Stone Chariot', '56 Musical Pillars', 'Royal Enclosures & Stepwells'],
      wireframeAvailable: true,
      audioStoryAvailable: true
    },
    {
      id: 'sanchi-stupa',
      name: 'Great Stupa at Sanchi',
      location: 'Raisen, Madhya Pradesh',
      dynasty: 'Maurya / Shunga Period (3rd BCE)',
      coordinates: [23.4800, 77.7400],
      category: 'Buddhist Architecture',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      summary: 'One of India\'s oldest stone structures commissioned by Emperor Ashoka, featuring intricately carved gateways (Toranas).',
      highlights: ['Four Ceremonial Torana Gateways', 'Brahmi Inscriptions', 'Asokan Lion Pillar Base'],
      wireframeAvailable: true,
      audioStoryAvailable: true
    },
    {
      id: 'ajanta-caves',
      name: 'Ajanta Rock-Cut Caves',
      location: 'Chhatrapati Sambhajinagar, Maharashtra',
      dynasty: 'Satavahana & Vakataka Empires (2nd BCE - 5th CE)',
      coordinates: [20.5523, 75.7004],
      category: 'Cave Paintings & Sculptures',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80',
      summary: '30 rock-cut Buddhist cave monuments housing masterwork frescoes and colossal rock carvings.',
      highlights: ['Padmapani Mural Fresco', 'Chaitya Prayer Halls', 'Monolithic Sleeping Buddha'],
      wireframeAvailable: true,
      audioStoryAvailable: true
    },
    {
      id: 'konark-sun',
      name: 'Konark Sun Temple',
      location: 'Puri, Odisha',
      dynasty: 'Eastern Ganga Dynasty (1250 CE)',
      coordinates: [19.8876, 85.8896],
      category: 'Solar Chariot Monument',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=600&q=80',
      summary: 'Gigantic stone chariot temple dedicated to Surya with 24 carved stone wheels acting as precise sundials.',
      highlights: ['Astronomical Stone Sundials', 'Erotic Kalinga Sculptures', 'Iron Beam Ceiling Engineering'],
      wireframeAvailable: true,
      audioStoryAvailable: true
    },
    {
      id: 'khajuraho',
      name: 'Khajuraho Group of Temples',
      location: 'Chhatarpur, Madhya Pradesh',
      dynasty: 'Chandela Dynasty (950 - 1050 CE)',
      coordinates: [24.8318, 79.9199],
      category: 'Nagara Style Temples',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=600&q=80',
      summary: 'Famous for Nagara-style architectural symbolism and expressive sandstone sculptures of life and spirituality.',
      highlights: ['Kandariya Mahadeva Temple', 'Intricate Sandstone Friezes', 'Celestial Apsara Reliefs'],
      wireframeAvailable: true,
      audioStoryAvailable: true
    }
  ],

  // Mobile Tourist Safe Routes & Emergency Helplines
  safetyData: {
    safeRoutes: [
      {
        id: 'hampi-safe-trail',
        monumentName: 'Hampi Monument Trail',
        startPoint: 'Hampi Bus Station',
        endPoint: 'Vitthala Temple Complex',
        safetyScore: 96,
        safetyRating: 'Verified Safe Tourist Corridor',
        lightingCoverage: '94% Illuminated Pathways',
        patrolFrequency: 'Every 15 Mins (Tourist Police)',
        crowdDensity: 'Moderate (Family Friendly)',
        distanceKm: '2.4 km',
        estimatedWalkTime: '28 mins',
        keySafetyZones: ['River Ferry Checkpoint', 'Bazaar Solar Lighting Hub', 'ASI Information Kiosk'],
        waypoints: [
          [15.3350, 76.4600],
          [15.3370, 76.4630],
          [15.3390, 76.4670]
        ]
      },
      {
        id: 'thanjavur-safe-corridor',
        monumentName: 'Thanjavur Royal Corridor',
        startPoint: 'Old Bus Stand',
        endPoint: 'Brihadeeswarar Temple Gate 1',
        safetyScore: 98,
        safetyRating: 'High-Security Cultural Zone',
        lightingCoverage: '98% LED Smart Lighting',
        patrolFrequency: 'Continuous CCTV & Patrol Vehicle',
        crowdDensity: 'Active & Welcoming',
        distanceKm: '1.2 km',
        estimatedWalkTime: '15 mins',
        keySafetyZones: ['Royal Palace Police Station', 'Medical First Aid Post', 'Help Desk Station'],
        waypoints: [
          [10.7828, 79.1318],
          [10.7850, 79.1340]
        ]
      }
    ],
    emergencyHelplines: [
      { name: 'National Tourist Helpline', number: '1363 / 1800-11-1363', desc: 'Toll-free 24x7 multi-language guidance', category: 'General' },
      { name: 'Police Emergency Response', number: '112', desc: 'Immediate emergency assistance', category: 'Police' },
      { name: 'Heritage Protection Corps', number: '+91 800-437-4824', desc: 'Monument security & lost item reporting', category: 'Security' },
      { name: 'Medical Ambulance Support', number: '108', desc: 'Rapid medical first responder dispatch', category: 'Medical' },
      { name: 'Women Safety Helpline', number: '1091', desc: 'Dedicated 24/7 women assistance', category: 'Safety' },
      { name: 'Foreign Tourist Cell', number: '+91 11-2336-5358', desc: 'Passport & embassy liaison support', category: 'Embassy' }
    ]
  }
};

export default HERITAGE_DATA;
