(function () {
  const examSyllabus = {
    'GATE CS': [
      { label: 'Algorithms and data structures', terms: ['algorithm', 'algorithms', 'data structure', 'dynamic programming', 'graph theory', 'tree traversal', 'sorting', 'complexity'] },
      { label: 'Operating systems', terms: ['operating system', 'process scheduling', 'deadlock', 'virtual memory', 'paging', 'file system'] },
      { label: 'Databases', terms: ['dbms', 'database', 'sql', 'normalization', 'transaction', 'relational algebra'] },
      { label: 'Computer networks', terms: ['computer network', 'network', 'ipv4', 'ipv6', 'tcp', 'ip addressing', 'subnetting', 'routing'] },
      { label: 'Theory of computation and compilers', terms: ['automata', 'theory of computation', 'context-free', 'regular expression', 'compiler', 'parsing', 'grammar'] },
      { label: 'Computer organization and digital logic', terms: ['computer organization', 'architecture', 'coa', 'digital logic', 'boolean algebra', 'pipeline', 'cache memory'] },
      { label: 'Mathematics', terms: ['discrete mathematics', 'engineering mathematics', 'linear algebra', 'probability', 'calculus', 'graph theory'] },
      { label: 'General aptitude', terms: ['aptitude', 'verbal ability', 'quantitative ability', 'reasoning'] }
    ],
    'GATE EE': [
      { label: 'Electrical machines', terms: ['electrical machine', 'transformer', 'induction motor', 'synchronous machine', 'dc machine'] },
      { label: 'Power systems', terms: ['power system', 'transmission line', 'load flow', 'fault analysis', 'protection system'] },
      { label: 'Power electronics', terms: ['power electronic', 'converter', 'inverter', 'thyristor', 'rectifier'] },
      { label: 'Control systems', terms: ['control system', 'root locus', 'stability', ' bode plot', 'state space'] },
      { label: 'Electric circuits', terms: ['electric circuit', 'network theory', 'circuit analysis', 'thevenin', 'nodal analysis'] },
      { label: 'Signals and systems', terms: ['signal', 'fourier', 'laplace transform', 'z-transform'] },
      { label: 'Electromagnetic fields', terms: ['electromagnetic', 'electromagnetic field', 'maxwell'] },
      { label: 'Mathematics and aptitude', terms: ['engineering mathematics', 'linear algebra', 'probability', 'aptitude'] }
    ],
    'GATE ME': [
      { label: 'Thermodynamics', terms: ['thermodynamic', 'thermodynamics', 'rankine cycle', 'otto cycle'] },
      { label: 'Fluid mechanics', terms: ['fluid mechanic', 'fluid flow', 'hydraulics', 'boundary layer'] },
      { label: 'Manufacturing engineering', terms: ['manufacturing', 'casting', 'machining', 'welding', 'forming process'] },
      { label: 'Machine design', terms: ['machine design', 'design of machine', 'failure theories', 'shaft design'] },
      { label: 'Strength of materials', terms: ['strength of material', 'solid mechanic', 'stress', 'strain', 'bending moment'] },
      { label: 'Theory of machines and vibrations', terms: ['theory of machine', 'kinematics', 'vibration', 'gear train'] },
      { label: 'Heat transfer', terms: ['heat transfer', 'conduction', 'convection', 'heat exchanger'] },
      { label: 'Mathematics and aptitude', terms: ['engineering mathematics', 'linear algebra', 'probability', 'aptitude'] }
    ],
    'UPSC CSE': [
      { label: 'Polity and governance', terms: ['polity', 'constitution', 'governance', 'parliament', 'fundamental rights'] },
      { label: 'History', terms: ['history', 'ancient india', 'medieval india', 'modern india', 'freedom struggle'] },
      { label: 'Geography', terms: ['geography', 'physical geography', 'indian geography', 'climatology'] },
      { label: 'Economy', terms: ['economy', 'economics', 'budget', 'banking', 'inflation'] },
      { label: 'Environment and ecology', terms: ['environment', 'ecology', 'biodiversity', 'climate change', 'conservation'] },
      { label: 'Science, current affairs and international relations', terms: ['science', 'technology', 'current affairs', 'international relations'] },
      { label: 'Ethics and aptitude', terms: ['ethics', 'integrity', 'aptitude', 'csat', 'reasoning', 'comprehension'] }
    ],
    'JEE Main': [
      { label: 'Physics', terms: ['physics', 'mechanics', 'electrodynamic', 'optics', 'thermodynamic', 'kinematics', 'newton law'] },
      { label: 'Chemistry', terms: ['chemistry', 'organic chemistry', 'inorganic chemistry', 'physical chemistry', 'chemical bonding', 'stoichiometry'] },
      { label: 'Mathematics', terms: ['mathematics', 'calculus', 'algebra', 'coordinate geometry', 'trigonometry', 'permutation', 'integration'] }
    ],
    'NEET UG': [
      { label: 'Biology', terms: ['biology', 'botany', 'zoology', 'genetics', 'ecology', 'human physiology', 'cell biology'] },
      { label: 'Physics', terms: ['physics', 'mechanics', 'electrodynamic', 'optics', 'thermodynamic', 'kinematics', 'newton law'] },
      { label: 'Chemistry', terms: ['chemistry', 'organic chemistry', 'inorganic chemistry', 'physical chemistry', 'chemical bonding', 'stoichiometry'] }
    ],
    CAT: [
      { label: 'Quantitative aptitude', terms: ['quantitative aptitude', 'quant', 'arithmetic', 'algebra', 'geometry', 'number system'] },
      { label: 'Logical reasoning and data interpretation', terms: ['logical reasoning', 'lrdi', 'data interpretation', 'reasoning', 'puzzles', 'sets and games'] },
      { label: 'Verbal ability and reading comprehension', terms: ['verbal ability', 'reading comprehension', 'grammar', 'vocabulary', 'para jumbles'] }
    ],
    GRE: [
      { label: 'Verbal reasoning', terms: ['verbal', 'reading comprehension', 'text completion', 'sentence equivalence', 'vocabulary'] },
      { label: 'Quantitative reasoning', terms: ['quant', 'arithmetic', 'algebra', 'geometry', 'data analysis'] },
      { label: 'Analytical writing', terms: ['analytical writing', 'essay', 'argument task', 'issue task'] }
    ]
  };

  const importantTopics = {
    'GATE CS': [
      ['Algorithms and data structures', 'Asymptotic analysis and recurrence relations'],
      ['Algorithms and data structures', 'Sorting and searching algorithms'],
      ['Algorithms and data structures', 'Trees, heaps and balanced search trees'],
      ['Algorithms and data structures', 'Graph traversal, shortest paths and minimum spanning trees'],
      ['Algorithms and data structures', 'Dynamic programming and greedy algorithms'],
      ['Operating systems', 'Process scheduling, synchronization and deadlocks'],
      ['Operating systems', 'Virtual memory, paging and page replacement'],
      ['Databases', 'Relational algebra, SQL and normalization'],
      ['Databases', 'Transactions, concurrency control and indexing'],
      ['Computer networks', 'IPv4 addressing, subnetting and CIDR'],
      ['Computer networks', 'TCP, congestion control and routing'],
      ['Theory of computation and compilers', 'Regular languages, finite automata and regular expressions'],
      ['Theory of computation and compilers', 'Context-free grammars and pushdown automata'],
      ['Computer organization and digital logic', 'Boolean algebra, combinational and sequential circuits'],
      ['Mathematics', 'Propositional logic, sets, relations and combinatorics']
    ],
    'GATE EE': [
      ['Electric circuits', 'Network theorems and AC circuit analysis'],
      ['Electric circuits', 'Transient analysis and resonance'],
      ['Electrical machines', 'Transformers: equivalent circuits, tests and efficiency'],
      ['Electrical machines', 'Induction and synchronous machines'],
      ['Power systems', 'Per-unit system, load flow and economic operation'],
      ['Power systems', 'Fault analysis, protection and stability'],
      ['Power electronics', 'Rectifiers, DC-DC converters and inverters'],
      ['Control systems', 'Block diagrams, signal flow graphs and transfer functions'],
      ['Control systems', 'Root locus, frequency response and stability'],
      ['Signals and systems', 'Fourier and Laplace transforms'],
      ['Electromagnetic fields', 'Electrostatics, magnetic fields and Maxwell equations'],
      ['Mathematics and aptitude', 'Linear algebra, probability and engineering mathematics']
    ],
    'GATE ME': [
      ['Engineering mechanics', 'Free-body diagrams, equilibrium and friction'],
      ['Strength of materials', 'Stress, strain, bending and torsion'],
      ['Theory of machines and vibrations', 'Kinematics, gears and balancing'],
      ['Theory of machines and vibrations', 'Free and forced vibration'],
      ['Machine design', 'Failure theories, shafts, bearings and fatigue'],
      ['Fluid mechanics', 'Fluid statics, Bernoulli equation and pipe flow'],
      ['Fluid mechanics', 'Dimensional analysis and boundary layers'],
      ['Thermodynamics', 'First and second laws and availability'],
      ['Thermodynamics', 'Air-standard cycles and properties of pure substances'],
      ['Heat transfer', 'Conduction, convection and radiation'],
      ['Manufacturing engineering', 'Metal cutting, tool life and machining processes'],
      ['Manufacturing engineering', 'Casting, welding and forming processes']
    ],
    'UPSC CSE': [
      ['Polity and governance', 'Constitutional framework and fundamental rights'],
      ['Polity and governance', 'Parliament, executive and judiciary'],
      ['Polity and governance', 'Federalism, local government and constitutional bodies'],
      ['History', 'Modern Indian history and the freedom movement'],
      ['History', 'Ancient and medieval Indian history'],
      ['Geography', 'Physical geography, climate and monsoon'],
      ['Geography', 'Indian geography, resources and agriculture'],
      ['Economy', 'National income, inflation and monetary policy'],
      ['Economy', 'Budget, taxation and inclusive growth'],
      ['Environment and ecology', 'Ecosystems, biodiversity and conservation'],
      ['Environment and ecology', 'Climate change and environmental conventions'],
      ['Ethics and aptitude', 'Reading comprehension, reasoning and data interpretation']
    ],
    'JEE Main': [
      ['Physics', 'Kinematics, Newton laws and work-energy theorem'],
      ['Physics', 'Rotational motion and centre of mass'],
      ['Physics', 'Electrostatics and current electricity'],
      ['Physics', 'Magnetism, electromagnetic induction and alternating current'],
      ['Physics', 'Ray optics, wave optics and modern physics'],
      ['Chemistry', 'Mole concept, atomic structure and chemical bonding'],
      ['Chemistry', 'Chemical and ionic equilibrium'],
      ['Chemistry', 'Electrochemistry and chemical kinetics'],
      ['Chemistry', 'General organic chemistry and reaction mechanisms'],
      ['Chemistry', 'Coordination compounds and periodic trends'],
      ['Mathematics', 'Limits, continuity, differentiation and integration'],
      ['Mathematics', 'Coordinate geometry: straight lines, circles and conics'],
      ['Mathematics', 'Matrices, determinants, vectors and 3D geometry'],
      ['Mathematics', 'Sequences, series, probability and complex numbers']
    ],
    'NEET UG': [
      ['Biology', 'Cell structure, biomolecules and cell division'],
      ['Biology', 'Human physiology: circulation, breathing and excretion'],
      ['Biology', 'Genetics, molecular basis of inheritance and evolution'],
      ['Biology', 'Reproduction in plants and humans'],
      ['Biology', 'Ecology, ecosystems and biodiversity'],
      ['Biology', 'Plant physiology and photosynthesis'],
      ['Physics', 'Laws of motion, work-energy and rotational motion'],
      ['Physics', 'Electrostatics, current electricity and magnetism'],
      ['Physics', 'Optics, waves and modern physics'],
      ['Chemistry', 'Chemical bonding, equilibrium and thermodynamics'],
      ['Chemistry', 'Coordination compounds and p-block elements'],
      ['Chemistry', 'Organic chemistry: reactions and functional groups']
    ],
    CAT: [
      ['Quantitative aptitude', 'Percentages, ratios and averages'],
      ['Quantitative aptitude', 'Profit, loss, mixtures and alligation'],
      ['Quantitative aptitude', 'Time, speed, distance and work'],
      ['Quantitative aptitude', 'Linear and quadratic equations'],
      ['Quantitative aptitude', 'Geometry, mensuration and number systems'],
      ['Logical reasoning and data interpretation', 'Tables, charts and caselet data interpretation'],
      ['Logical reasoning and data interpretation', 'Arrangements, grouping and tournaments'],
      ['Logical reasoning and data interpretation', 'Routes, networks and set-based puzzles'],
      ['Verbal ability and reading comprehension', 'Reading comprehension: inference and author tone'],
      ['Verbal ability and reading comprehension', 'Para jumbles, summaries and sentence placement']
    ],
    GRE: [
      ['Verbal reasoning', 'Text completion and sentence equivalence'],
      ['Verbal reasoning', 'Reading comprehension: inference and argument structure'],
      ['Verbal reasoning', 'Vocabulary in context'],
      ['Quantitative reasoning', 'Arithmetic, ratios, percentages and number properties'],
      ['Quantitative reasoning', 'Algebra, equations and inequalities'],
      ['Quantitative reasoning', 'Geometry, coordinate geometry and measurement'],
      ['Quantitative reasoning', 'Statistics, probability and data interpretation'],
      ['Analytical writing', 'Issue essay: building a clear, supported argument'],
      ['Analytical writing', 'Argument essay: evaluating assumptions and evidence']
    ]
  };

  function normalize(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function detectTopic(topic, exam) {
    const text = normalize(`${topic.subject || ''} ${topic.title || ''}`);
    const areas = examSyllabus[exam] || [];
    for (const area of areas) {
      const matchedTerm = area.terms.find((term) => {
        const normalizedTerm = normalize(term);
        const words = normalizedTerm.split(' ');
        const escapedWords = words.map((word, index) => {
          const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          return index === words.length - 1 ? `${escaped}s?` : escaped;
        });
        const phrase = escapedWords.join('\\s+');
        return normalizedTerm && new RegExp(`(^|\\s)${phrase}(\\s|$)`).test(text);
      });
      if (matchedTerm) {
        return {
          matched: true,
          area: area.label,
          matchedTerm: normalize(matchedTerm),
          confidence: text.includes(normalize(topic.subject || '')) && normalize(topic.subject || '')
            ? 'strong'
            : 'possible'
        };
      }
    }
    return {
      matched: false,
      area: null,
      matchedTerm: null,
      confidence: 'review'
    };
  }

  function rankTopic(topic, exam) {
    const detection = detectTopic(topic, exam);
    const importanceScores = { high: 100, normal: 0, revision: 5 };
    const importance = importanceScores[topic.importance || 'normal'] || 0;
    const examScore = detection.matched ? 60 : 10;
    const reasons = [];
    if (detection.matched) reasons.push(`Detected ${exam} topic: ${detection.area}`);
    else if (examSyllabus[exam]) reasons.push(`No syllabus match detected for ${exam}; check the official syllabus`);
    else reasons.push('No syllabus map is available; ranked using your importance setting');
    if (topic.importance === 'high') reasons.push('You marked this topic high priority');
    else if (topic.importance === 'revision') reasons.push('You marked this topic for revision');
    else reasons.push('Normal importance');
    return {
      score: examScore + importance,
      detection,
      reasons
    };
  }

  window.StudyAgent = Object.freeze({ detectTopic, rankTopic });
  function getRecommendedTopics(exam) {
    return (importantTopics[exam] || []).map(([subject, title]) => ({
      subject,
      title,
      importance: 'high'
    }));
  }

  window.StudyAgent = Object.freeze({ detectTopic, rankTopic, getRecommendedTopics });
})();
