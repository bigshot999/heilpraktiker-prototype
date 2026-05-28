export type Treatment = {
  slug: string
  name: string
  shortDescription: string
  benefit: string
  gradientFrom: string
  gradientTo: string
  quickAnswer: string          // 40-60 word standalone answer for AI extraction
  statistic: { value: string; source: string } // cited stat for AI authority
  description: string[]
  indications: string[]
  sessionSteps: string[]
}

export const treatments: Treatment[] = [
  {
    slug: 'phytotherapie',
    name: 'Phytotherapie',
    shortDescription: 'Heilkräuter & pflanzliche Extrakte',
    benefit: 'Sanft & nebenwirkungsfrei',
    gradientFrom: '#e8f0e4',
    gradientTo: '#d4e8d0',
    quickAnswer:
      'Phytotherapie ist die wissenschaftlich fundierte Behandlung mit Heilpflanzen und pflanzlichen Wirkstoffen. Sie nutzt standardisierte Pflanzenextrakte zur Linderung von Beschwerden und unterstützt die körpereigene Regulation — sanft, mit nachgewiesener Wirkung und deutlich weniger Nebenwirkungen als synthetische Arzneimittel.',
    statistic: {
      value: 'Laut WHO nutzen rund 80 % der Weltbevölkerung pflanzliche Heilmittel als Teil ihrer Gesundheitsversorgung (WHO, 2019).',
      source: 'World Health Organization (2019). WHO global report on traditional and complementary medicine.',
    },
    description: [
      'Die Phytotherapie nutzt die Heilkraft der Pflanzen, um den Körper sanft zu unterstützen und zu regulieren.',
      'Im Gegensatz zu synthetischen Medikamenten wirken pflanzliche Präparate ganzheitlich und haben in der Regel deutlich weniger Nebenwirkungen.',
      'Ich stelle für Sie ein individuelles Kräuterprogramm zusammen — abgestimmt auf Ihre Beschwerden, Ihre Konstitution und Ihren Alltag.',
    ],
    indications: ['Chronische Erschöpfung', 'Schlafstörungen', 'Verdauungsbeschwerden', 'Immunschwäche', 'Nervosität & Stress'],
    sessionSteps: [
      'Ausführliches Erstgespräch zu Ihren Beschwerden',
      'Analyse Ihrer Konstitution und Lebensweise',
      'Zusammenstellung Ihres individuellen Kräuterplans',
      'Besprechung der Einnahme und Dosierung',
      'Folgetermin zur Anpassung nach 4 Wochen',
    ],
  },
  {
    slug: 'homoeopathie',
    name: 'Homöopathie',
    shortDescription: 'Sanfte Regulationsmedizin',
    benefit: 'Aktiviert Ihre Selbstheilungskräfte',
    gradientFrom: '#f0ece4',
    gradientTo: '#e4dcd0',
    quickAnswer:
      'Homöopathie ist eine ganzheitliche Heilmethode, die hochverdünnte Substanzen einsetzt, um die Selbstheilungskräfte des Körpers anzuregen. Die Behandlung berücksichtigt individuelle Symptome, Persönlichkeit und Lebensumstände — nicht nur die Diagnose. Ziel ist eine nachhaltige Regulierung des gesamten Organismus.',
    statistic: {
      value: 'In Deutschland nutzen ca. 60 % der Bevölkerung komplementäre und alternative Medizin, davon ist Homöopathie eine der meistgenutzten Methoden (Allensbach, 2014).',
      source: 'Institut für Demoskopie Allensbach (2014). Naturheilkunde und Homöopathie in Deutschland.',
    },
    description: [
      'Die Homöopathie ist eine sanfte Heilmethode, die die Selbstheilungskräfte des Körpers anregt.',
      'Auf Basis Ihrer individuellen Symptome, Ihrer Persönlichkeit und Ihrer Lebensumstände wähle ich das passende homöopathische Mittel für Sie aus.',
      'Viele Patienten berichten, dass sie sich nach der homöopathischen Behandlung nicht nur körperlich besser fühlen, sondern auch innerlich ausgeglichener.',
    ],
    indications: ['Akute und chronische Erkrankungen', 'Allergien', 'Hormonschwankungen', 'Emotionale Belastungen', 'Kinderkrankheiten'],
    sessionSteps: [
      'Eingehende Anamnese (60–90 Minuten)',
      'Analyse Ihrer Symptome und Ihrer Persönlichkeit',
      'Auswahl des individuellen Konstitutionsmittels',
      'Einnahmeempfehlung und Verhaltenshinweise',
      'Verlaufsgespräch nach 4–6 Wochen',
    ],
  },
  {
    slug: 'akupunktur',
    name: 'Akupunktur',
    shortDescription: 'TCM & Meridianbehandlung',
    benefit: 'Schmerzen lösen, Energie zurückgewinnen',
    gradientFrom: '#e4eee8',
    gradientTo: '#d0e4d8',
    quickAnswer:
      'Akupunktur ist ein Verfahren der Traditionellen Chinesischen Medizin (TCM), bei dem feine Nadeln an definierten Punkten gesetzt werden, um Energieflüsse zu regulieren und Selbstheilung zu fördern. Besonders wirksam bei chronischen Schmerzen, Migräne, Schlafstörungen und stressbedingten Beschwerden.',
    statistic: {
      value: "Die WHO erkennt Akupunktur für über 40 Erkrankungen als wirksame Behandlungsoption an; bei chronischen Rückenschmerzen zeigen Metaanalysen signifikante Schmerzreduktion (Acupuncture Trialists' Collaboration, 2017).",
      source: "Acupuncture Trialists' Collaboration (2017). Acupuncture for chronic pain. Journal of Pain.",
    },
    description: [
      'Die Akupunktur ist ein zentrales Verfahren der Traditionellen Chinesischen Medizin (TCM) und wird seit Jahrtausenden erfolgreich eingesetzt.',
      'Durch das gezielte Setzen feiner Nadeln an bestimmten Punkten des Körpers werden Energieblockaden gelöst und die natürliche Balance wiederhergestellt.',
      'Viele meiner Patienten kommen wegen chronischer Schmerzen — und erleben oft schon nach wenigen Sitzungen eine deutliche Verbesserung.',
    ],
    indications: ['Rückenschmerzen & Verspannungen', 'Migräne & Kopfschmerzen', 'Chronische Schmerzen', 'Schlafstörungen', 'Fruchtbarkeit & Zyklusprobleme'],
    sessionSteps: [
      'Zungendiagnose und Pulsdiagnose nach TCM',
      'Bestimmung der betroffenen Meridiane',
      'Setzen der feinen Akupunkturnadeln (20–30 Min)',
      'Ruhezeit zur Wirkungsentfaltung',
      'Nachgespräch und Empfehlungen',
    ],
  },
  {
    slug: 'ernaehrungsberatung',
    name: 'Ernährungsberatung',
    shortDescription: 'Individuelle Ernährungskonzepte',
    benefit: 'Mehr Energie & besserer Schlaf',
    gradientFrom: '#fdf4e8',
    gradientTo: '#f5e4c8',
    quickAnswer:
      'Ernährungsberatung analysiert individuelle Ernährungsgewohnheiten und entwickelt maßgeschneiderte Konzepte für langfristige Gesundheit. Anders als Diätpläne zielt sie auf nachhaltige Verhaltensänderung — mit Fokus auf vollwertige, entzündungshemmende Lebensmittel, die Energie steigern, Schlaf verbessern und chronischen Beschwerden vorbeugen.',
    statistic: {
      value: 'Fehlernährung ist laut Robert Koch-Institut einer der führenden vermeidbaren Risikofaktoren für chronische Erkrankungen in Deutschland — betroffen sind über 67 % der Männer und 53 % der Frauen (RKI, Gesundheitssurvey 2020).',
      source: 'Robert Koch-Institut (2020). Ernährungsverhalten Erwachsener in Deutschland.',
    },
    description: [
      'Was wir essen, beeinflusst nicht nur unsere körperliche Gesundheit, sondern auch unsere Energie, unsere Stimmung und unseren Schlaf.',
      'Ich entwickle mit Ihnen ein Ernährungskonzept, das zu Ihrem Körper, Ihrem Alltag und Ihren Vorlieben passt — kein Diätplan, sondern eine nachhaltige Veränderung.',
      'Der Fokus liegt auf vollwertigen, entzündungshemmenden Lebensmitteln, die Sie langfristig nähren und stärken.',
    ],
    indications: ['Erschöpfung & Energielosigkeit', 'Gewichtsmanagement', 'Darmprobleme', 'Entzündliche Erkrankungen', 'Lebensmittelunverträglichkeiten'],
    sessionSteps: [
      'Analyse Ihrer aktuellen Ernährungsgewohnheiten',
      'Besprechung Ihrer Ziele und Beschwerden',
      'Entwicklung Ihres persönlichen Ernährungsplans',
      'Einkaufs- und Kochempfehlungen',
      'Folgegespräch nach 6 Wochen',
    ],
  },
  {
    slug: 'stressmedizin',
    name: 'Stressmedizin',
    shortDescription: 'Burnout & Stressprävention',
    benefit: 'Zurück zu Ruhe, Fokus & Balance',
    gradientFrom: '#eae8f0',
    gradientTo: '#d8d4e8',
    quickAnswer:
      'Stressmedizin untersucht die körperlichen und seelischen Ursachen von chronischem Stress und entwickelt individuelle Strategien zur Prävention und Behandlung. Sie verbindet medizinische Diagnostik mit Entspannungsverfahren, Stressanalyse und Verhaltensänderung — um nachhaltig Burnout zu verhindern und Lebensqualität zurückzugewinnen.',
    statistic: {
      value: 'Laut DAK Gesundheitsreport 2023 sind psychische Erkrankungen — insbesondere stressbedingte Störungen — erstmals die häufigste Ursache für Krankschreibungen in Deutschland (DAK, 2023).',
      source: 'DAK-Gesundheit (2023). Gesundheitsreport 2023: Psychische Erkrankungen.',
    },
    description: [
      'Dauerstress ist heute eine der häufigsten Ursachen für körperliche und seelische Beschwerden — von Schlafproblemen über Herzbeschwerden bis hin zum Burnout.',
      'In meiner Praxis betrachten wir Stress nicht als persönliches Versagen, sondern als Signal des Körpers, das gehört werden möchte.',
      'Gemeinsam erarbeiten wir Strategien, die wirklich zu Ihrem Leben passen: Entspannungsmethoden, Grenzen setzen, und die Ursachen von Stress erkennen und verändern.',
    ],
    indications: ['Burnout & Erschöpfungssyndrom', 'Schlafstörungen', 'Angstzustände', 'Chronische Anspannung', 'Work-Life-Balance'],
    sessionSteps: [
      'Stressanalyse: Ursachen und Auslöser verstehen',
      'Körperliche Untersuchung der Stresssymptome',
      'Individuelle Entspannungstechniken erlernen',
      'Langfristiger Stressmanagement-Plan',
      'Regelmäßige Begleitung und Anpassung',
    ],
  },
]

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug)
}
