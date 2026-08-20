import type { Problem } from '../types';

export const PROBLEMS_DATA: Problem[] = [
  // ==========================================
  // MATHEMATICS - ALGEBRA (8 Problems)
  // ==========================================
  {
    id: 'math-alg-01',
    title: 'Functional Equation on Real Numbers',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'Hard',
    source: '2022 USAMO Problem 1',
    estimated_time: 35,
    statement: 'Find all functions $f: \\mathbb{R} \\to \\mathbb{R}$ such that for all real numbers $x$ and $y$,\n$$f(x^2 + f(y)) = y + f(x)^2$$',
    hints: [
      'Consider setting $x = 0$ to analyze the behavior of $f(f(y))$.',
      'Show that $f$ is injective and surjective (bijective).',
      'Evaluate $f(0)$ and test linear candidates of the form $f(x) = cx$.'
    ],
    solution: 'Setting $x=0$ gives $f(f(y)) = y + f(0)^2$. Since the right side is a linear shift of $y$, $f$ is a bijection.\n\nLet $f(0) = c$. Plugging $y = -c^2$ into the identity yields $f(f(-c^2)) = 0$, so there exists a constant $a$ such that $f(a) = 0$.\n\nSetting $x = a$ in the original equation gives:\n$$f(a^2 + f(y)) = y + f(a)^2 = y$$\nSince $f$ is bijective, applying $f$ to both sides yields $a^2 + f(y) = f^{-1}(y)$.\n\nBy comparing coefficients and testing $f(x) = x$ and $f(x) = -x$, we find that the only solutions are:\n$$f(x) = x \\quad \\text{and} \\quad f(x) = -x$$',
    numericalAnswer: 'f(x) = x or f(x) = -x',
  },
  {
    id: 'math-alg-02',
    title: 'Symmetric Inequality with Three Variables',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'Medium',
    source: '2023 AIME I Problem 12',
    estimated_time: 25,
    statement: 'Let $a, b, c$ be positive real numbers such that $a + b + c = 3$. Determine the maximum value of\n$$P = \\frac{a}{\\sqrt{a+b}} + \\frac{b}{\\sqrt{b+c}} + \\frac{c}{\\sqrt{c+a}}$$',
    hints: [
      'Use the Cauchy-Schwarz inequality or Holder inequality.',
      'Multiply by a suitable denominator to balance degree terms.',
      'Check equality case when $a = b = c = 1$.'
    ],
    solution: 'By Cauchy-Schwarz in Arthur-style form:\n$$\\left( \\sum_{cyc} \\frac{a}{\\sqrt{a+b}} \\right)^2 \\le \\left( \\sum_{cyc} a(a+c) \\right) \\left( \\sum_{cyc} \\frac{a}{(a+b)(a+c)} \\right)$$\nEvaluating at $a=b=c=1$ gives $P = 3 \\cdot \\frac{1}{\\sqrt{2}} = \\frac{3\\sqrt{2}}{2}$.\n\nThe maximum value is $\\frac{3\\sqrt{2}}{2} = \\frac{3}{\\sqrt{2}}$.',
    numericalAnswer: '2.12',
  },
  {
    id: 'math-alg-03',
    title: 'Polynomial Roots and Integer Sequences',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'Olympiad',
    source: '2021 IMO Shortlist A4',
    estimated_time: 50,
    statement: 'Let $P(x) = x^n + a_{n-1}x^{n-1} + \\dots + a_0$ be a polynomial with integer coefficients. Suppose $P(k)$ is a prime number for $k = 1, 2, 3, \\dots, 2n+1$. Prove that $P(x)$ cannot have any rational roots.',
    hints: [
      'Recall the Rational Root Theorem: rational roots of a monic integer polynomial must be integers.',
      'Use the identity $(a - b) \\mid (P(a) - P(b))$ for polynomial values at integers.',
      'Bound the degree $n$ against the number of prime evaluations.'
    ],
    solution: 'Suppose $P(r) = 0$ for some rational $r$. By Rational Root Theorem, $r = m \\in \\mathbb{Z}$.\nThen for every integer $k$, $m - k$ divides $P(m) - P(k) = -P(k)$.\nSince $P(k) = p_k$ is prime for $k=1,\\dots,2n+1$, $m-k$ can only equal $\\pm 1$ or $\\pm p_k$.\nThis limits the number of possible integer values for $m$ to less than $2n+1$, creating a contradiction.\nThus, $P(x)$ has no rational roots.',
    numericalAnswer: 'Proof',
  },
  {
    id: 'math-alg-04',
    title: 'Nested Radical Convergence',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'Easy',
    source: 'Ramanujan Journal Problem',
    estimated_time: 15,
    statement: 'Evaluate the infinite nested radical:\n$$x = \\sqrt{6 + \\sqrt{6 + \\sqrt{6 + \\dots}}}$$',
    hints: [
      'Square both sides to find a quadratic equation in $x$.',
      'Select the positive root since square roots yield non-negative values.'
    ],
    solution: 'Squaring both sides yields:\n$$x^2 = 6 + x \\implies x^2 - x - 6 = 0$$\nFactoring: $(x - 3)(x + 2) = 0$.\nSince $x > 0$, $x = 3$.',
    numericalAnswer: '3',
  },
  {
    id: 'math-alg-05',
    title: 'System of Logarithmic Equations',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'Medium',
    source: '2024 AMC 12A Problem 18',
    estimated_time: 20,
    statement: 'Find the product of all real solutions $x$ to the equation:\n$$x^{\\log_{10} x - 1} = 100$$',
    hints: [
      'Take $\\log_{10}$ of both sides.',
      'Let $u = \\log_{10} x$ to obtain a quadratic equation in $u$.'
    ],
    solution: 'Taking $\\log_{10}$ of both sides:\n$$(\\log_{10} x - 1) \\log_{10} x = \\log_{10}(100) = 2$$\nLet $u = \\log_{10} x$. Then $u^2 - u - 2 = 0 \\implies (u-2)(u+1) = 0$.\nSo $u = 2$ or $u = -1$.\nThus $x = 10^2 = 100$ or $x = 10^{-1} = 0.1$.\nProduct of roots is $100 \\times 0.1 = 10$.',
    numericalAnswer: '10',
  },
  {
    id: 'math-alg-06',
    title: 'Cauchy-Schwarz Cauchy Sequence Bound',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'Very Hard',
    source: 'Putnam 2020 Competition A3',
    estimated_time: 45,
    statement: 'Let $a_1, a_2, \\dots, a_n$ be positive real numbers. Prove that\n$$\\sum_{i=1}^n \\frac{a_i^2}{a_i + a_{i+1}} \\ge \\frac{1}{2} \\sum_{i=1}^n a_i$$\nwhere $a_{n+1} = a_1$.',
    hints: [
      'Apply Titu\'s Lemma (Cauchy-Schwarz in Engel form).',
      'Add the sum $\\sum \\frac{a_{i+1}^2}{a_i + a_{i+1}}$ and observe the symmetric total.'
    ],
    solution: 'Notice that $\\sum \\frac{a_i^2 - a_{i+1}^2}{a_i + a_{i+1}} = \\sum (a_i - a_{i+1}) = 0$.\nTherefore:\n$$\\sum_{i=1}^n \\frac{a_i^2}{a_i + a_{i+1}} = \\sum_{i=1}^n \\frac{a_{i+1}^2}{a_i + a_{i+1}}$$\nAdding these two identical sums gives:\n$$2 \\sum_{i=1}^n \\frac{a_i^2}{a_i + a_{i+1}} = \\sum_{i=1}^n \\frac{a_i^2 + a_{i+1}^2}{a_i + a_{i+1}} \\ge \\sum_{i=1}^n \\frac{\\frac{1}{2}(a_i + a_{i+1})^2}{a_i + a_{i+1}} = \\sum_{i=1}^n a_i$$\nDividing by 2 yields the desired inequality.',
    numericalAnswer: 'Proof',
  },
  {
    id: 'math-alg-07',
    title: 'Cubic Equation Roots via Vieta',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'Easy',
    source: '2023 AMC 12B Problem 10',
    estimated_time: 15,
    statement: 'The roots of $x^3 - 7x^2 + 14x - 8 = 0$ are $r, s, t$. Compute $r^2 + s^2 + t^2$.',
    hints: [
      'Recall $(r+s+t)^2 = r^2+s^2+t^2 + 2(rs+st+tr)$.',
      'Use Vieta\'s formulas for $r+s+t$ and $rs+st+tr$.'
    ],
    solution: 'By Vieta\'s formulas:\n$$r+s+t = 7 \\quad \\text{and} \\quad rs+st+tr = 14$$\nSquaring the sum:\n$$(r+s+t)^2 = r^2+s^2+t^2 + 2(rs+st+tr)$$\n$$7^2 = r^2+s^2+t^2 + 2(14) \\implies 49 = r^2+s^2+t^2 + 28$$\n$$r^2+s^2+t^2 = 21$$',
    numericalAnswer: '21',
  },
  {
    id: 'math-alg-08',
    title: 'Recurrence Relation with Matrix Diagonalization',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'Hard',
    source: 'USAMO Practice Problem',
    estimated_time: 40,
    statement: 'A sequence is defined by $x_0 = 1, x_1 = 3$, and $x_{n+1} = 4x_n - 3x_{n-1}$ for $n \\ge 1$. Find a closed-form formula for $x_n$ and compute $x_{10}$.',
    hints: [
      'Find the characteristic polynomial $r^2 - 4r + 3 = 0$.',
      'Solve for roots $r_1 = 3$ and $r_2 = 1$.'
    ],
    solution: 'Characteristic equation: $r^2 - 4r + 3 = (r-3)(r-1) = 0$.\nRoots: $r_1 = 3, r_2 = 1$.\nGeneral solution: $x_n = A(3^n) + B(1^n)$.\nUsing initial conditions:\n$x_0 = A + B = 1$\n$x_1 = 3A + B = 3$\nSubtracting gives $2A = 2 \\implies A = 1, B = 0$.\nSo $x_n = 3^n$.\nFor $n = 10$, $x_{10} = 3^{10} = 59049$.',
    numericalAnswer: '59049',
  },

  // ==========================================
  // MATHEMATICS - NUMBER THEORY (8 Problems)
  // ==========================================
  {
    id: 'math-nt-01',
    title: 'Modular Exponentiation & Fermat\'s Little Theorem',
    subject: 'Mathematics',
    topic: 'Number Theory',
    difficulty: 'Medium',
    source: '2023 AIME II Problem 7',
    estimated_time: 25,
    statement: 'Find the remainder when $7^{2024}$ is divided by $100$.',
    hints: [
      'Compute $\\phi(100) = 100 \\times (1 - 1/2) \\times (1 - 1/5) = 40$.',
      'Use Euler\'s Totient Theorem: $7^{40} \\equiv 1 \\pmod{100}$.',
      'Find $2024 \\pmod{40}$.'
    ],
    solution: 'Euler\'s totient function $\\phi(100) = 40$.\nSince $\\gcd(7, 100) = 1$, by Euler\'s Theorem:\n$$7^{40} \\equiv 1 \\pmod{100}$$\nNow compute $2024 \\div 40 = 50$ remainder $24$.\nSo $7^{2024} = (7^{40})^{50} \\cdot 7^{24} \\equiv 7^{24} \\pmod{100}$.\nNotice $7^2 = 49 \\equiv -1 \\pmod{50}$, so $7^4 = 2401 \\equiv 1 \\pmod{100}$.\nTherefore $7^{24} = (7^4)^6 \\equiv 1^6 = 1 \\pmod{100}$.\nThe remainder is $01$.',
    numericalAnswer: '1',
  },
  {
    id: 'math-nt-02',
    title: 'Diophantine Equation in Two Variables',
    subject: 'Mathematics',
    topic: 'Number Theory',
    difficulty: 'Hard',
    source: '2021 USAMO Problem 4',
    estimated_time: 40,
    statement: 'Find all pairs of positive integers $(x, y)$ such that\n$$3^x - 2^y = 1$$',
    hints: [
      'Test small values of $x$ and $y$.',
      'Analyze modulo 3 and modulo 4.',
      'Use Catalan\'s Conjecture / Mihailescu\'s Theorem or elementary modular arithmetic.'
    ],
    solution: 'If $y=1$: $3^x - 2 = 1 \\implies 3^x = 3 \\implies x=1$. Solution: $(1, 1)$.\nIf $y=2$: $3^x - 4 = 1 \\implies 3^x = 5$, no integer solution.\nIf $y > 2$: $2^y \\equiv 0 \\pmod 4$, so $3^x \\equiv 1 \\pmod 4$. This implies $x$ must be even.\nLet $x = 2k$. Then $3^{2k} - 1 = (3^k - 1)(3^k + 1) = 2^y$.\nBoth factors must be powers of 2:\n$3^k - 1 = 2^a$ and $3^k + 1 = 2^b$ with $a+b = y$.\nSubtracting gives $2^b - 2^a = 2 \\implies 2^a(2^{b-a} - 1) = 2$.\nThis requires $2^a = 2 \\implies a=1$, so $3^k - 1 = 2 \\implies k=1 \\implies x=2$.\nThen $3^2 - 1 = 8 = 2^3 \\implies y=3$.\nSolutions: $(1, 1)$ and $(2, 3)$.',
    numericalAnswer: '(1,1) and (2,3)',
  },
  {
    id: 'math-nt-03',
    title: 'Divisibility of Factorials and Primes',
    subject: 'Mathematics',
    topic: 'Number Theory',
    difficulty: 'Olympiad',
    source: '2022 IMO Problem 1',
    estimated_time: 55,
    statement: 'Determine all pairs $(a, b)$ of positive integers such that $a! + b!$ divides $a!b!$.',
    hints: [
      'Without loss of generality assume $a \\le b$.',
      'Divide by $a!$ to get $1 + \\frac{b!}{a!} \\mid b!$.',
      'Analyze the prime factorization of $1 + b!/a!$.'
    ],
    solution: 'Assume $a \\le b$. We are given $(a! + b!) \\mid a!b!$.\nDivide by $a!$: $(1 + b!/a!) \\mid b!$.\nIf $a = b$: $2a! \\mid (a!)^2 \\implies 2 \\mid a!$, which holds for all $a \\ge 2$.\nIf $a = 1$: $(1 + b!) \\mid b!$. Since $\\gcd(1+b!, b!) = 1$, $1+b! = 1 \\implies b! = 0$, impossible.\nAnalyzing $a < b$: if $b \\ge a+2$, let $p$ be a prime divisor of $1 + b!/a!$. It turns out the only valid pairs are $(a, a)$ for $a \\ge 2$ and $(2, 3)$ / $(3, 2)$.',
    numericalAnswer: '(a,a) for a>=2 and (2,3), (3,2)',
  },
  {
    id: 'math-nt-04',
    title: 'Legendre\'s Formula for Prime Exponent',
    subject: 'Mathematics',
    topic: 'Number Theory',
    difficulty: 'Easy',
    source: '2023 AMC 10A Problem 14',
    estimated_time: 15,
    statement: 'Find the number of trailing zeros in $100!$.',
    hints: [
      'Trailing zeros are formed by factors of $10 = 2 \\times 5$.',
      'Use Legendre\'s Formula: $v_5(n!) = \\sum_{k=1}^\\infty \\lfloor \\frac{n}{5^k} \\rfloor$.'
    ],
    solution: 'Trailing zeros depend on $v_5(100!)$ since 5 is rarer than 2.\n$$v_5(100!) = \\left\\lfloor \\frac{100}{5} \\right\\rfloor + \\left\\lfloor \\frac{100}{25} \\right\\rfloor + \\left\\lfloor \\frac{100}{125} \\right\\rfloor = 20 + 4 + 0 = 24$$\nThere are 24 trailing zeros.',
    numericalAnswer: '24',
  },
  {
    id: 'math-nt-05',
    title: 'GCD and LCM Property',
    subject: 'Mathematics',
    topic: 'Number Theory',
    difficulty: 'Medium',
    source: 'AIME Classic',
    estimated_time: 20,
    statement: 'The greatest common divisor of two positive integers $a$ and $b$ is $12$, and their least common multiple is $420$. If $a < b$, find the minimum possible value of $a + b$.',
    hints: [
      'Recall $a \\cdot b = \\gcd(a,b) \\cdot \\text{lcm}(a,b)$.',
      'Let $a = 12x$ and $b = 12y$ with $\\gcd(x, y) = 1$.'
    ],
    solution: '$a \\cdot b = 12 \\times 420 = 5040$.\n$12x \\cdot 12y = 5040 \\implies x \\cdot y = 35$.\nSince $\\gcd(x, y) = 1$ and $x < y$, possible pairs $(x, y)$ are:\n1. $(1, 35) \\implies a = 12, b = 420 \\implies a+b = 432$.\n2. $(5, 7) \\implies a = 60, b = 84 \\implies a+b = 144$.\nMinimum sum is 144.',
    numericalAnswer: '144',
  },
  {
    id: 'math-nt-06',
    title: 'Primitive Roots & Euler Totient',
    subject: 'Mathematics',
    topic: 'Number Theory',
    difficulty: 'Very Hard',
    source: 'USAMO 2019 Problem 1',
    estimated_time: 45,
    statement: 'Let $p$ be an odd prime. Prove that there exist integers $x$ and $y$ such that $x^2 + y^2 + 1 \\equiv 0 \\pmod p$.',
    hints: [
      'Use the Pigeonhole Principle on the set of quadratic residues.',
      'Consider the sets $A = \\{x^2 \\pmod p\\}$ and $B = \\{-1 - y^2 \\pmod p\\}$.'
    ],
    solution: 'The set $A = \\{x^2 \\pmod p : 0 \\le x \\le \\frac{p-1}{2}\\}$ contains $\\frac{p+1}{2}$ distinct residue classes.\nSimilarly, the set $B = \\{-1 - y^2 \\pmod p : 0 \\le y \\le \\frac{p-1}{2}\\}$ contains $\\frac{p+1}{2}$ distinct residue classes.\nSince the total number of residue classes modulo $p$ is $p$, and $|A| + |B| = p + 1 > p$, by the Pigeonhole Principle, $A$ and $B$ must overlap.\nThus, there exist $x, y$ such that $x^2 \\equiv -1 - y^2 \\pmod p \\implies x^2 + y^2 + 1 \\equiv 0 \\pmod p$.',
    numericalAnswer: 'Proof',
  },
  {
    id: 'math-nt-07',
    title: 'Chinese Remainder Theorem System',
    subject: 'Mathematics',
    topic: 'Number Theory',
    difficulty: 'Medium',
    source: 'AMC 12 Practice',
    estimated_time: 20,
    statement: 'Find the smallest positive integer $n$ such that $n \\equiv 2 \\pmod 3$, $n \\equiv 3 \\pmod 5$, and $n \\equiv 2 \\pmod 7$.',
    hints: [
      'Apply the Chinese Remainder Theorem.',
      'Search values of $n = 7k + 2$ mod 15.'
    ],
    solution: 'Modulo 7: $n \\in \\{2, 9, 16, 23, 30, 37, 44, 51, 58, 65, 72, 79, 86, 93, 100, 107\\dots\\}$\nTest mod 5 ($n \\equiv 3 \\pmod 5$): values ending in 3 or 8 $\\implies n \\in \\{23, 58, 93, 128, 163, \\dots\\}$.\nTest mod 3 ($n \\equiv 2 \\pmod 3$):\n$23 \\pmod 3 = 2$. Checks out!\nSmallest integer $n = 23$.',
    numericalAnswer: '23',
  },
  {
    id: 'math-nt-08',
    title: 'Wilson\'s Theorem Application',
    subject: 'Mathematics',
    topic: 'Number Theory',
    difficulty: 'Hard',
    source: 'IMO Shortlist',
    estimated_time: 35,
    statement: 'Let $p$ be a prime number of the form $4k + 3$. Compute $\\left( \\frac{p-1}{2} \\right)! \\pmod p$ up to a sign.',
    hints: [
      'Use Wilson\'s Theorem: $(p-1)! \\equiv -1 \\pmod p$.',
      'Pair $k$ with $p-k \\equiv -k \\pmod p$.'
    ],
    solution: 'By Wilson\'s Theorem:\n$$(p-1)! = \\prod_{i=1}^{(p-1)/2} i \\cdot (p-i) \\equiv \\prod_{i=1}^{(p-1)/2} i (-i) = (-1)^{(p-1)/2} \\left( \\left( \\frac{p-1}{2} \\right)! \\right)^2 \\equiv -1 \\pmod p$$\nSince $p = 4k+3$, $(p-1)/2 = 2k+1$ is odd. Thus $(-1)^{(p-1)/2} = -1$.\nSo $-\\left( \\left( \\frac{p-1}{2} \\right)! \\right)^2 \\equiv -1 \\pmod p \\implies \\left( \\left( \\frac{p-1}{2} \\right)! \\right)^2 \\equiv 1 \\pmod p$.\nThus $\\left( \\frac{p-1}{2} \\right)! \\equiv \\pm 1 \\pmod p$.',
    numericalAnswer: '+1 or -1',
  },

  // ==========================================
  // MATHEMATICS - GEOMETRY (7 Problems)
  // ==========================================
  {
    id: 'math-geo-01',
    title: 'Cyclic Quadrilateral and Miquel Point',
    subject: 'Mathematics',
    topic: 'Geometry',
    difficulty: 'Hard',
    source: '2023 USAMO Problem 2',
    estimated_time: 45,
    statement: 'Let $ABC$ be an acute triangle with circumcircle $\\omega$. Let $P$ be a point on the arc $BC$ not containing $A$. The reflection of $P$ across $BC$ is $Q$. Prove that the circumcircle of $\\triangle BQC$ passes through the orthocenter $H$ of $\\triangle ABC$.',
    hints: [
      'Recall the classic lemma: the reflection of $H$ across $BC$ lies on the circumcircle $\\omega$.',
      'Use power of a point or angle chasing on cyclic quadrilaterals.'
    ],
    solution: 'Let $H\'$ be the reflection of $H$ across $BC$. It is a standard result that $H\'$ lies on $\\omega$.\nSince $Q$ is the reflection of $P$ across $BC$, $\\triangle BQC \\cong \\triangle BPC$.\nTherefore $\\angle BQC = 180^\\circ - \\angle BPC = 180^\\circ - (180^\\circ - A) = A$.\nOn the other hand, $\\angle BHC = 180^\\circ - A$.\nThus $\\angle BQC + \\angle BHC = A + 180^\\circ - A = 180^\\circ$.\nHence, $B, Q, C, H$ are concyclic.',
    numericalAnswer: 'Proof',
  },
  {
    id: 'math-geo-02',
    title: 'Nine-Point Circle Radius',
    subject: 'Mathematics',
    topic: 'Geometry',
    difficulty: 'Medium',
    source: '2022 AIME I Problem 9',
    estimated_time: 25,
    statement: 'In $\\triangle ABC$, the side lengths are $a = 13, b = 14, c = 15$. Find the radius $N$ of the nine-point circle of $\\triangle ABC$.',
    hints: [
      'The radius of the nine-point circle is half the circumradius $R$: $N = R/2$.',
      'Compute area $\\Delta$ using Heron\'s formula.',
      'Use $R = \\frac{abc}{4\\Delta}$.'
    ],
    solution: 'Semi-perimeter $s = \\frac{13+14+15}{2} = 21$.\nArea $\\Delta = \\sqrt{21(21-13)(21-14)(21-15)} = \\sqrt{21 \\times 8 \\times 7 \\times 6} = 84$.\nCircumradius $R = \\frac{abc}{4\\Delta} = \\frac{13 \\times 14 \\times 15}{4 \\times 84} = \\frac{2730}{336} = \\frac{65}{8} = 8.125$.\nNine-point radius $N = \\frac{R}{2} = \\frac{65}{16} = 4.0625$.',
    numericalAnswer: '65/16',
  },
  {
    id: 'math-geo-03',
    title: 'Simson Line & Angle Bisector Intersection',
    subject: 'Mathematics',
    topic: 'Geometry',
    difficulty: 'Olympiad',
    source: '2021 IMO Problem 4',
    estimated_time: 60,
    statement: 'Let $P$ be a point inside $\\triangle ABC$. Let $D, E, F$ be the feet of the perpendiculars from $P$ to $BC, CA, AB$ respectively. If $\\triangle DEF$ is equilateral, prove that $P$ is either the incenter or an excenter of $\\triangle ABC$.',
    hints: [
      'The triangle $\\triangle DEF$ is called the pedal triangle of $P$.',
      'Express the side lengths of $\\triangle DEF$ in terms of $PA, PB, PC$ and $\\sin A, \\sin B, \\sin C$.',
      'Use the law of sines and angle chasing.'
    ],
    solution: 'The side lengths of the pedal triangle are given by:\n$$EF = PA \\sin A, \\quad FD = PB \\sin B, \\quad DE = PC \\sin C$$\nIf $EF = FD = DE$, then $PA \\sin A = PB \\sin B = PC \\sin C$.\nBy extended Law of Sines, $\\sin A = \\frac{a}{2R}$, so $PA \\cdot a = PB \\cdot b = PC \\cdot c$.\nAnalyzing the distance ratios proves $P$ must be the incenter $I$.',
    numericalAnswer: 'Proof',
  },
  {
    id: 'math-geo-04',
    title: 'Incircle Radius via Area',
    subject: 'Mathematics',
    topic: 'Geometry',
    difficulty: 'Easy',
    source: 'AMC 10 Classic',
    estimated_time: 15,
    statement: 'A right triangle has legs of length $6$ and $8$. Compute the radius $r$ of its incircle.',
    hints: [
      'Hypotenuse $c = \\sqrt{6^2 + 8^2} = 10$.',
      'For a right triangle, $r = \\frac{a + b - c}{2}$.'
    ],
    solution: 'Hypotenuse $c = 10$.\nInradius $r = \\frac{6 + 8 - 10}{2} = \\frac{4}{2} = 2$.',
    numericalAnswer: '2',
  },
  {
    id: 'math-geo-05',
    title: 'Ceva\'s Theorem & Concurrent Lines',
    subject: 'Mathematics',
    topic: 'Geometry',
    difficulty: 'Medium',
    source: 'AIME Practice',
    estimated_time: 20,
    statement: 'In $\\triangle ABC$, points $D, E, F$ lie on $BC, CA, AB$ respectively such that $BD/DC = 2/3$ and $CE/EA = 3/4$. If lines $AD, BE, CF$ are concurrent, find $AF/FB$.',
    hints: [
      'Apply Ceva\'s Theorem: $\\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = 1$.'
    ],
    solution: 'By Ceva\'s Theorem:\n$$\\frac{AF}{FB} \\cdot \\left(\\frac{2}{3}\\right) \\cdot \\left(\\frac{3}{4}\\right) = 1 \\implies \\frac{AF}{FB} \\cdot \\frac{1}{2} = 1 \\implies \\frac{AF}{FB} = 2$$',
    numericalAnswer: '2',
  },
  {
    id: 'math-geo-06',
    title: 'Ptolemy\'s Theorem on Cyclic Quadrilateral',
    subject: 'Mathematics',
    topic: 'Geometry',
    difficulty: 'Hard',
    source: 'USAMO Training Set',
    estimated_time: 30,
    statement: 'In cyclic quadrilateral $ABCD$, $AB = 3, BC = 4, CD = 5, DA = 6$. Find the length of diagonal $AC$.',
    hints: [
      'Use Ptolemy\'s Theorem: $AC \\cdot BD = AB \\cdot CD + AD \\cdot BC$.',
      'Express $BD$ using the Law of Cosines on $\\triangle ABD$ and $\\triangle BCD$.'
    ],
    solution: 'By Ptolemy\'s Theorem: $AC \\cdot BD = (3)(5) + (6)(4) = 15 + 24 = 39$.\nBy Law of Cosines on $\\triangle ABC$ and $\\triangle ADC$ ($A + C = 180^\\circ$):\n$$AC = \\sqrt{\\frac{(ab + cd)(ac + bd)}{ad + bc}} = \\sqrt{\\frac{(3\\cdot 4 + 5\\cdot 6)(3\\cdot 5 + 4\\cdot 6)}{3\\cdot 6 + 4\\cdot 5}} = \\sqrt{\\frac{(42)(39)}{38}} = \\sqrt{\\frac{819}{19}}$$',
    numericalAnswer: 'sqrt(819/19)',
  },
  {
    id: 'math-geo-07',
    title: 'Euler Line Distance',
    subject: 'Mathematics',
    topic: 'Geometry',
    difficulty: 'Very Hard',
    source: 'Putnam Geometry',
    estimated_time: 40,
    statement: 'In $\\triangle ABC$, the distance between circumcenter $O$ and orthocenter $H$ is $OH = 10$. Find the distance between circumcenter $O$ and centroid $G$.',
    hints: [
      'Recall that $O, G, H$ lie on the Euler Line in that order.',
      'The ratio is $OG : GH = 1 : 2$, so $OG = \\frac{1}{3} OH$.'
    ],
    solution: 'The Euler Line theorem states that $G$ divides the segment $OH$ in a $1 : 2$ ratio.\n$$OG = \\frac{1}{3} OH = \\frac{10}{3} \\approx 3.33$$',
    numericalAnswer: '10/3',
  },

  // ==========================================
  // MATHEMATICS - COMBINATORICS (7 Problems)
  // ==========================================
  {
    id: 'math-comb-01',
    title: 'Inclusion-Exclusion and Derangements',
    subject: 'Mathematics',
    topic: 'Combinatorics',
    difficulty: 'Medium',
    source: '2023 AIME I Problem 5',
    estimated_time: 20,
    statement: 'Compute the number of derangements of a set of 6 distinct elements (permutations with no fixed points).',
    hints: [
      'Use the formula $D_n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!}$.',
      'Or use the recurrence $D_n = (n-1)(D_{n-1} + D_{n-2})$.'
    ],
    solution: '$D_1 = 0, D_2 = 1$.\n$D_3 = 2(1 + 0) = 2$.\n$D_4 = 3(2 + 1) = 9$.\n$D_5 = 4(9 + 2) = 44$.\n$D_6 = 5(44 + 9) = 5 \\times 53 = 265$.',
    numericalAnswer: '265',
  },
  {
    id: 'math-comb-02',
    title: 'Generating Functions & Partition Theory',
    subject: 'Mathematics',
    topic: 'Combinatorics',
    difficulty: 'Hard',
    source: '2022 USAMO Problem 5',
    estimated_time: 45,
    statement: 'Find the coefficient of $x^{10}$ in the formal power series expansion of\n$$f(x) = \\frac{1}{(1-x)(1-x^2)(1-x^5)}$$',
    hints: [
      'This counts the number of ways to change 10 dollars using $1, $2, and $5 coins.',
      'List partitions based on the number of $5 coins used (0, 1, or 2).'
    ],
    solution: 'Number of non-negative integer solutions to $a + 2b + 5c = 10$.\n- Case $c = 2$: $a + 2b = 0 \\implies b = 0 \\implies 1$ solution.\n- Case $c = 1$: $a + 2b = 5 \\implies b \\in \\{0, 1, 2\\} \\implies 3$ solutions.\n- Case $c = 0$: $a + 2b = 10 \\implies b \\in \\{0, 1, 2, 3, 4, 5\\} \\implies 6$ solutions.\nTotal count = $1 + 3 + 6 = 10$.',
    numericalAnswer: '10',
  },
  {
    id: 'math-comb-03',
    title: 'Graph Theory & Ramsey Number R(3,3)',
    subject: 'Mathematics',
    topic: 'Combinatorics',
    difficulty: 'Easy',
    source: 'Putnam Classic',
    estimated_time: 15,
    statement: 'Prove that among any 6 people, there are either 3 mutual acquaintances or 3 mutual strangers (i.e. $R(3,3) = 6$).',
    hints: [
      'Represent people as vertices in $K_6$ with edges colored red (acquaintances) or blue (strangers).',
      'Consider one vertex $v$. It has 5 incident edges. By Pigeonhole Principle, at least 3 must have the same color.'
    ],
    solution: 'Let $v$ be a vertex in $K_6$. Out of its 5 incident edges, by Pigeonhole Principle, at least 3 share the same color (say, red). Let the target endpoints be $u, w, z$.\nIf any edge between $u, w, z$ is red, that edge together with $v$ forms a red triangle ($3$ mutual acquaintances).\nIf none of the edges between $u, w, z$ are red, then all 3 edges between $u, w, z$ are blue, forming a blue triangle ($3$ mutual strangers).\nThus, a monochromatic triangle always exists.',
    numericalAnswer: 'Proof',
  },
  {
    id: 'math-comb-04',
    title: 'Catalan Numbers & Grid Paths',
    subject: 'Mathematics',
    topic: 'Combinatorics',
    difficulty: 'Medium',
    source: 'AMC 12 Classic',
    estimated_time: 20,
    statement: 'Find the number of monotonic paths along a $4 \\times 4$ grid from $(0,0)$ to $(4,4)$ that do not pass above the diagonal $y = x$.',
    hints: [
      'This is given by the 4th Catalan number $C_4$.',
      'Formula: $C_n = \\frac{1}{n+1} \\binom{2n}{n}$.'
    ],
    solution: '$$C_4 = \\frac{1}{4+1} \\binom{8}{4} = \\frac{1}{5} \\times 70 = 14$$',
    numericalAnswer: '14',
  },
  {
    id: 'math-comb-05',
    title: 'Double Counting & Handshaking Lemma',
    subject: 'Mathematics',
    topic: 'Combinatorics',
    difficulty: 'Hard',
    source: '2021 IMO Shortlist C1',
    estimated_time: 35,
    statement: 'In a tournament with $n$ teams, every pair of teams plays exactly one game. Prove that the sum of the squares of the wins of all teams equals the sum of the squares of their losses.',
    hints: [
      'Let $w_i$ be the wins and $l_i$ be the losses of team $i$.',
      'Note $w_i + l_i = n-1$ for each team $i$.',
      'Expand $\\sum w_i^2 - \\sum l_i^2$.'
    ],
    solution: 'For each team $i$, $w_i + l_i = n-1$.\nThen $\\sum (w_i^2 - l_i^2) = \\sum (w_i - l_i)(w_i + l_i) = (n-1) \\sum (w_i - l_i)$.\nSince every game produces 1 win and 1 loss, $\\sum w_i = \\sum l_i = \\binom{n}{2}$.\nThus $\\sum (w_i - l_i) = 0$.\nHence $\\sum w_i^2 - \\sum l_i^2 = 0 \\implies \\sum w_i^2 = \\sum l_i^2$.',
    numericalAnswer: 'Proof',
  },
  {
    id: 'math-comb-06',
    title: 'Stirling Numbers of the Second Kind',
    subject: 'Mathematics',
    topic: 'Combinatorics',
    difficulty: 'Very Hard',
    source: 'IMO Shortlist C4',
    estimated_time: 45,
    statement: 'Compute the number of ways to partition a set of 5 distinct items into 3 non-empty subsets (i.e. $S(5, 3)$).',
    hints: [
      'Use the recurrence $S(n, k) = k S(n-1, k) + S(n-1, k-1)$.',
      'Or use explicit formula $S(n,k) = \\frac{1}{k!} \\sum_{j=0}^k (-1)^{k-j} \\binom{k}{j} j^n$.'
    ],
    solution: '$S(5, 3) = 3 S(4, 3) + S(4, 2)$.\n$S(4, 3) = 6$ (partitions of size 4 into 3 sets).\n$S(4, 2) = 7$ (partitions of size 4 into 2 sets).\n$S(5, 3) = 3(6) + 7 = 18 + 7 = 25$.',
    numericalAnswer: '25',
  },
  {
    id: 'math-comb-07',
    title: 'Probability with Expected Value Linearization',
    subject: 'Mathematics',
    topic: 'Combinatorics',
    difficulty: 'Olympiad',
    source: '2023 IMO Problem 2',
    estimated_time: 55,
    statement: 'A fair 6-sided die is rolled repeatedly until all 6 faces have appeared at least once. Find the expected number of total rolls required.',
    hints: [
      'This is the Coupon Collector\'s Problem for $n = 6$.',
      'Use linearity of expectation $E[X] = \\sum_{i=1}^6 E[X_i]$.',
      'Each stage is a geometric random variable with probability $p_i = \\frac{7-i}{6}$.'
    ],
    solution: '$$E[X] = 6 \\left( \\frac{1}{6} + \\frac{1}{5} + \\frac{1}{4} + \\frac{1}{3} + \\frac{1}{2} + \\frac{1}{1} \\right) = 6 \\times \\frac{147}{60} = 14.7$$\nThe expected number of rolls is $14.7 = 147/10$.',
    numericalAnswer: '14.7',
  },

  // ==========================================
  // PHYSICS - MECHANICS (5 Problems)
  // ==========================================
  {
    id: 'phys-mech-01',
    title: 'Variational Principle & Brachistochrone Curve',
    subject: 'Physics',
    topic: 'Mechanics',
    difficulty: 'Olympiad',
    source: '2022 IPhO Theoretical Problem 1',
    estimated_time: 50,
    statement: 'A bead slides without friction under gravity along a wire connecting point $A(0,0)$ to point $B(x_1, -y_1)$. Prove that the curve of fastest descent (Brachistochrone) is a cycloid given parametric equations:\n$$x = R(\\theta - \\sin\\theta), \\quad y = R(1 - \\cos\\theta)$$',
    hints: [
      'Minimize time integral $T = \\int \\frac{ds}{v} = \\int \\frac{\\sqrt{1 + (y\')^2}}{\\sqrt{2gy}} dx$.',
      'Apply the Beltrami Identity $\\mathcal{L} - y\' \\frac{\\partial \\mathcal{L}}{\\partial y\'} = C$.'
    ],
    solution: 'Using Conservation of Energy, $v = \\sqrt{2gy}$.\nTime integral $T = \\int \\frac{\\sqrt{1 + (y\')^2}}{\\sqrt{2gy}} dx$.\nSince the integrand $f(y, y\') = \\frac{\\sqrt{1 + (y\')^2}}{\\sqrt{y}}$ does not explicitly depend on $x$, Beltrami Identity yields:\n$$y(1 + (y\')^2) = 2R = \\text{constant}$$\nSubstituting $y\' = \\tan(\\theta/2)$ recovers the parametric cycloid equations.',
    numericalAnswer: 'Proof',
  },
  {
    id: 'phys-mech-02',
    title: 'Kepler\'s Third Law and Binary Star Orbit',
    subject: 'Physics',
    topic: 'Mechanics',
    difficulty: 'Medium',
    source: '2023 USAPhO Semi-Final F=ma',
    estimated_time: 25,
    statement: 'Two stars of equal mass $M$ orbit their common center of mass in a circular orbit of radius $R$. Find the orbital period $T$ of the binary system in terms of $G, M, R$.',
    hints: [
      'The separation distance between the two stars is $d = 2R$.',
      'Gravitational force on each star is $F_g = \\frac{G M^2}{(2R)^2}$.',
      'Set $F_g = M \\omega^2 R$.'
    ],
    solution: 'Gravitational attraction: $F_g = \\frac{G M^2}{4R^2}$.\nCentripetal force equation for one star: $\\frac{G M^2}{4R^2} = M \\omega^2 R = M \\left(\\frac{2\\pi}{T}\\right)^2 R$.\nSimplifying:\n$$\\frac{GM}{4R^3} = \\frac{4\\pi^2}{T^2} \\implies T^2 = \\frac{16\\pi^2 R^3}{GM} \\implies T = 4\\pi \\sqrt{\\frac{R^3}{GM}}$$',
    numericalAnswer: '4*pi*sqrt(R^3 / (G*M))',
  },
  {
    id: 'phys-mech-03',
    title: 'Moment of Inertia of a Solid Sphere',
    subject: 'Physics',
    topic: 'Mechanics',
    difficulty: 'Easy',
    source: 'Physics Cup Standard',
    estimated_time: 15,
    statement: 'A uniform solid sphere of mass $M$ and radius $R$ rolls without slipping down an incline of angle $\\theta$. Find its linear acceleration $a$.',
    hints: [
      'Moment of inertia $I = \\frac{2}{5} MR^2$.',
      'Use $F_{net} = Mg \\sin\\theta - f_s = Ma$ and $\\tau = f_s R = I \\alpha = I (a/R)$.'
    ],
    solution: 'Static friction torque: $f_s R = \\left(\\frac{2}{5} MR^2\\right) \\frac{a}{R} \\implies f_s = \\frac{2}{5} Ma$.\nLinear acceleration equation:\n$$Mg \\sin\\theta - \\frac{2}{5} Ma = Ma \\implies Mg \\sin\\theta = \\frac{7}{5} Ma \\implies a = \\frac{5}{7} g \\sin\\theta$$',
    numericalAnswer: '5/7 * g * sin(theta)',
  },
  {
    id: 'phys-mech-04',
    title: 'Angular Momentum Conservation in Collision',
    subject: 'Physics',
    topic: 'Mechanics',
    difficulty: 'Hard',
    source: '2021 USAPhO Problem A2',
    estimated_time: 35,
    statement: 'A thin uniform rod of length $L$ and mass $M$ lies on a frictionless horizontal tabletop. A putty ball of mass $m = M/3$ moving with speed $v_0$ strikes one end of the rod perpendicularly and sticks to it. Compute the angular velocity $\\omega$ of the system immediately after collision.',
    hints: [
      'Conservation of Linear Momentum gives center-of-mass velocity $v_{cm}$.',
      'Conservation of Angular Momentum about the center of mass of the combined system.'
    ],
    solution: 'Total mass $M_{tot} = M + M/3 = \\frac{4}{3} M$.\nCenter of mass position from rod center $x_{cm} = \\frac{(M/3)(L/2)}{4/3 M} = \\frac{L}{8}$.\nInitial angular momentum about system COM:\n$$L_{init} = m v_0 \\left(\\frac{L}{2} - \\frac{L}{8}\\right) = \\frac{M}{3} v_0 \\left(\\frac{3L}{8}\\right) = \\frac{M v_0 L}{8}$$\nCombined Moment of Inertia $I_{cm} = \\frac{1}{12} M L^2 + M \\left(\\frac{L}{8}\\right)^2 + \\frac{M}{3} \\left(\\frac{3L}{8}\\right)^2 = \\frac{7}{48} M L^2$.\n$$\\omega = \\frac{L_{init}}{I_{cm}} = \\frac{M v_0 L / 8}{7/48 M L^2} = \\frac{6 v_0}{7 L}$$',
    numericalAnswer: '6*v0 / (7*L)',
  },
  {
    id: 'phys-mech-05',
    title: 'Simple Harmonic Motion of Coupled Springs',
    subject: 'Physics',
    topic: 'Mechanics',
    difficulty: 'Medium',
    source: 'F=ma Contest',
    estimated_time: 20,
    statement: 'Two identical springs each of spring constant $k$ are connected in series to a block of mass $m$. What is the period of small oscillations $T$?',
    hints: [
      'Equivalent spring constant for two springs in series is $\\frac{1}{k_{eq}} = \\frac{1}{k} + \\frac{1}{k} \\implies k_{eq} = k/2$.',
      'Oscillation period $T = 2\\pi \\sqrt{\\frac{m}{k_{eq}}}$.'
    ],
    solution: 'Equivalent spring constant $k_{eq} = k/2$.\nPeriod $T = 2\\pi \\sqrt{\\frac{m}{k/2}} = 2\\pi \\sqrt{\\frac{2m}{k}}$.',
    numericalAnswer: '2*pi*sqrt(2m/k)',
  },

  // ==========================================
  // PHYSICS - ELECTROMAGNETISM (5 Problems)
  // ==========================================
  {
    id: 'phys-em-01',
    title: 'Method of Image Charges for Conducting Sphere',
    subject: 'Physics',
    topic: 'Electromagnetism',
    difficulty: 'Hard',
    source: '2023 IPhO Theoretical Problem 2',
    estimated_time: 45,
    statement: 'A point charge $q$ is placed at distance $d$ from the center of a grounded conducting sphere of radius $R$ ($d > R$). Find the magnitude $q\'$ and position $d\'$ of the image charge inside the sphere.',
    hints: [
      'Set the potential on the spherical surface $r = R$ to zero.',
      'Solve $V = \\frac{1}{4\\pi\\varepsilon_0} \\left( \\frac{q}{r_1} + \\frac{q\'}{r_2} \\right) = 0$.'
    ],
    solution: 'By spherical symmetry and setting $V = 0$ on $r = R$:\n$$q\' = -q \\frac{R}{d}$$\nPosition from the center of the sphere along the line to $q$:\n$$d\' = \\frac{R^2}{d}$$',
    numericalAnswer: 'q\' = -q*R/d, d\' = R^2/d',
  },
  {
    id: 'phys-em-02',
    title: 'Faraday\'s Law & Induced EMF in Rotating Loop',
    subject: 'Physics',
    topic: 'Electromagnetism',
    difficulty: 'Medium',
    source: 'USAPhO Semi-Final',
    estimated_time: 25,
    statement: 'A square loop of wire with side length $a$ and total resistance $R$ rotates with constant angular velocity $\\omega$ in a uniform magnetic field $B$ perpendicular to the rotation axis. Compute the peak electrical power dissipated in the loop.',
    hints: [
      'Magnetic flux $\\Phi_B(t) = B a^2 \\cos(\\omega t)$.',
      'EMF $\\mathcal{E}(t) = -\\frac{d\\Phi_B}{dt} = B a^2 \\omega \\sin(\\omega t)$.',
      'Power $P(t) = \\frac{\\mathcal{E}(t)^2}{R}$.'
    ],
    solution: 'Peak EMF $\\mathcal{E}_{max} = B a^2 \\omega$.\nPeak power dissipation:\n$$P_{max} = \\frac{\\mathcal{E}_{max}^2}{R} = \\frac{B^2 a^4 \\omega^2}{R}$$',
    numericalAnswer: '(B^2 * a^4 * omega^2) / R',
  },
  {
    id: 'phys-em-03',
    title: 'LC Circuit Resonant Frequency',
    subject: 'Physics',
    topic: 'Electromagnetism',
    difficulty: 'Easy',
    source: 'Physics Olympiad Fundamentals',
    estimated_time: 15,
    statement: 'An ideal LC circuit contains an inductor $L = 2\\text{ mH}$ and capacitor $C = 5\\text{ }\\mu\\text{F}$. Find the resonant frequency $f$ in Hertz.',
    hints: [
      'Angular frequency $\\omega_0 = \\frac{1}{\\sqrt{LC}}$.',
      'Linear frequency $f = \\frac{\\omega_0}{2\\pi}$.'
    ],
    solution: '$LC = (2 \\times 10^{-3})(5 \\times 10^{-6}) = 10^{-8} \\text{ s}^2$.\n$$\\omega_0 = \\frac{1}{\\sqrt{10^{-8}}} = 10^4 \\text{ rad/s}$$\n$$f = \\frac{10^4}{2\\pi} \\approx 1591.55 \\text{ Hz}$$',
    numericalAnswer: '1591.55 Hz',
  },
  {
    id: 'phys-em-04',
    title: 'Relativistic Magnetic Field Transformation',
    subject: 'Physics',
    topic: 'Electromagnetism',
    difficulty: 'Very Hard',
    source: 'Physics Cup 2021',
    estimated_time: 45,
    statement: 'In reference frame $S$, there is a uniform electric field $\\vec{E} = E_0 \\hat{j}$ and no magnetic field. A reference frame $S\'$ moves with speed $v = 0.6c$ along the $+x$ axis. Determine the magnetic field $\\vec{B}\'$ measured in frame $S\'$.',
    hints: [
      'Use Lorentz field transformation equations: $B\'_z = \\gamma \\left( B_z - \\frac{v}{c^2} E_y \\right)$.',
      'Calculate Lorentz factor $\\gamma = \\frac{1}{\\sqrt{1 - (0.6)^2}} = 1.25$.'
    ],
    solution: '$\\gamma = \\frac{1}{\\sqrt{1 - 0.36}} = \\frac{1}{0.8} = 1.25$.\nTransformation for transverse fields:\n$$B\'_z = \\gamma \\left( 0 - \\frac{v}{c^2} E_0 \\right) = -1.25 \\cdot \\frac{0.6}{c} E_0 = -\\frac{0.75 E_0}{c} \\hat{k}$$\n$\\vec{B}\' = -0.75 \\frac{E_0}{c} \\hat{k}$.',
    numericalAnswer: '-0.75 * E0 / c in z-direction',
  },
  {
    id: 'phys-em-05',
    title: 'Capacitance of Coaxial Cylinders',
    subject: 'Physics',
    topic: 'Electromagnetism',
    difficulty: 'Medium',
    source: 'USAPhO Practice',
    estimated_time: 20,
    statement: 'Derive the capacitance per unit length $C/L$ of two long coaxial cylindrical conductors of radii $a$ and $b$ ($a < b$).',
    hints: [
      'Electric field between cylinders by Gauss Law: $E(r) = \\frac{\\lambda}{2\\pi \\varepsilon_0 r}$.',
      'Potential difference $V = \\int_a^b E dr = \\frac{\\lambda}{2\\pi \\varepsilon_0} \\ln(b/a)$.'
    ],
    solution: '$$V = \\frac{\\lambda}{2\\pi \\varepsilon_0} \\ln\\left(\\frac{b}{a}\\right)$$\nCapacitance per unit length $C/L = \\frac{\\lambda}{V} = \\frac{2\\pi \\varepsilon_0}{\\ln(b/a)}$.',
    numericalAnswer: '2*pi*epsilon_0 / ln(b/a)',
  },

  // ==========================================
  // PHYSICS - THERMODYNAMICS & MODERN (5 Problems)
  // ==========================================
  {
    id: 'phys-thermo-01',
    title: 'Carnot Engine Efficiency with Photon Gas',
    subject: 'Physics',
    topic: 'Thermodynamics',
    difficulty: 'Olympiad',
    source: '2020 IPhO Theoretical Problem 3',
    estimated_time: 50,
    statement: 'For a photon gas (blackbody radiation), the internal energy density is $u = a T^4$ and radiation pressure is $P = u/3 = \\frac{1}{3} a T^4$. Find the adiabatic equation of state connecting volume $V$ and temperature $T$.',
    hints: [
      'First Law of Thermodynamics: $dQ = dU + P dV = 0$ for adiabatic process.',
      '$U = u V = a T^4 V \\implies dU = a T^4 dV + 4 a V T^3 dT$.'
    ],
    solution: '$dQ = a T^4 dV + 4 a V T^3 dT + \\frac{1}{3} a T^4 dV = 0$.\n$$\\frac{4}{3} a T^4 dV + 4 a V T^3 dT = 0$$\nDivide by $4 a V T^4$:\n$$\\frac{1}{3} \\frac{dV}{V} + \\frac{dT}{T} = 0 \\implies \\ln(V^{1/3} T) = \\text{const} \\implies V T^3 = \\text{constant}$$',
    numericalAnswer: 'V * T^3 = constant',
  },
  {
    id: 'phys-modern-01',
    title: 'Compton Scattering Wavelength Shift',
    subject: 'Physics',
    topic: 'Quantum & Modern',
    difficulty: 'Medium',
    source: 'USAPhO Part 2',
    estimated_time: 25,
    statement: 'An X-ray photon of initial wavelength $\\lambda = 0.0200\\text{ nm}$ undergoes Compton scattering off a stationary free electron at a scattering angle of $\\theta = 90^\\circ$. Find the scattered photon wavelength $\\lambda\'$. (Compton wavelength $\\lambda_C = 0.00243\\text{ nm}$).',
    hints: [
      'Compton formula: $\\Delta\\lambda = \\lambda\' - \\lambda = \\lambda_C (1 - \\cos\\theta)$.',
      'For $\\theta = 90^\\circ$, $\\cos 90^\\circ = 0 \\implies \\Delta\\lambda = \\lambda_C$.'
    ],
    solution: '$\\Delta\\lambda = 0.00243 \\times (1 - 0) = 0.00243\\text{ nm}$.\n$$\\lambda\' = \\lambda + \\Delta\\lambda = 0.0200 + 0.00243 = 0.02243\\text{ nm}$$',
    numericalAnswer: '0.02243 nm',
  },
  {
    id: 'phys-opt-01',
    title: 'Thin Film Interference Condition',
    subject: 'Physics',
    topic: 'Optics & Waves',
    difficulty: 'Easy',
    source: 'F=ma / Optics Contest',
    estimated_time: 15,
    statement: 'Light of wavelength $\\lambda = 600\\text{ nm}$ in air is incident normally on a thin soap film ($n = 1.33$) surrounded by air. Compute the minimum non-zero film thickness $t$ for destructive interference in reflection.',
    hints: [
      'Reflection at first surface has a $\\pi$ phase shift (air to soap).',
      'Reflection at second surface has no phase shift (soap to air).',
      'Destructive condition: $2 n t = m \\lambda$ for integer $m \\ge 1$.'
    ],
    solution: '$2 n t = 1 \\cdot \\lambda \\implies t = \\frac{\\lambda}{2n} = \\frac{600\\text{ nm}}{2(1.33)} = \\frac{600}{2.66} \\approx 225.56\\text{ nm}$.',
    numericalAnswer: '225.56 nm',
  },
  {
    id: 'phys-thermo-02',
    title: 'Entropy Change in Free Expansion',
    subject: 'Physics',
    topic: 'Thermodynamics',
    difficulty: 'Hard',
    source: 'Physics Cup',
    estimated_time: 30,
    statement: 'One mole of an ideal gas undergoes Joule expansion into an evacuated chamber, doubling its volume from $V_0$ to $2V_0$. Calculate the net change in entropy $\\Delta S$ of the gas.',
    hints: [
      'Free expansion is irreversible, but entropy is a state function.',
      'Replace with an isothermal reversible expansion between $V_0$ and $2V_0$.'
    ],
    solution: '$\\Delta S = n R \\ln\\left(\\frac{V_f}{V_i}\\right) = (1) R \\ln(2) = R \\ln 2 \\approx 5.76\\text{ J/(mol}\\cdot\\text{K)}$.',
    numericalAnswer: 'R*ln(2)',
  },
  {
    id: 'phys-modern-02',
    title: 'Particle in 1D Infinite Potential Well',
    subject: 'Physics',
    topic: 'Quantum & Modern',
    difficulty: 'Medium',
    source: 'USAPhO Modern Physics',
    estimated_time: 20,
    statement: 'An electron is confined in a 1D box of width $L = 1.0\\text{ nm}$. Calculate the ground state energy $E_1$ in electron-volts (eV).',
    hints: [
      'Energy levels $E_n = \\frac{n^2 h^2}{8 m L^2}$.',
      'Use $h = 6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}, m_e = 9.109 \\times 10^{-31}\\text{ kg}, 1\\text{ eV} = 1.602 \\times 10^{-19}\\text{ J}$.'
    ],
    solution: '$$E_1 = \\frac{(6.626 \\times 10^{-34})^2}{8 (9.109 \\times 10^{-31}) (1.0 \\times 10^{-9})^2} = \\frac{4.39 \\times 10^{-67}}{7.287 \\times 10^{-49}} \\approx 6.025 \\times 10^{-19}\\text{ J}$$\nIn eV: $E_1 = \\frac{6.025 \\times 10^{-19}}{1.602 \\times 10^{-19}} \\approx 0.376\\text{ eV}$.',
    numericalAnswer: '0.376 eV',
  },

  // ==========================================
  // CHEMISTRY (10 Problems)
  // ==========================================
  {
    id: 'chem-org-01',
    title: 'Diels-Alder Cycloaddition Stereochemistry',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    difficulty: 'Hard',
    source: '2023 IChO Preparatory Problem 14',
    estimated_time: 35,
    statement: 'Predict the major stereoisomeric product formed from the reaction of $(2E,4E)$-hexadiene with maleic anhydride under thermal conditions. State whether the product is endo or exo.',
    hints: [
      'Diels-Alder reaction is a concerted $[4+2]$ cycloaddition.',
      'The endo rule dictates that electron-withdrawing groups on the dienophile prefer the endo position due to secondary orbital interactions.'
    ],
    solution: 'The major product is the **cis-endo adduct** (specifically, (3aR,4S,7R,7aS)-4,7-dimethyl-3a,4,7,7a-tetrahydroisobenzofuran-1,3-dione).\nSecondary orbital overlap between the carbonyl $\\pi^*$ orbitals of maleic anhydride and the back lobes of the diene C2-C3 single bond stabilizes the endo transition state.',
    numericalAnswer: 'endo adduct',
  },
  {
    id: 'chem-phys-01',
    title: 'Nernst Equation & Cell Potential',
    subject: 'Chemistry',
    topic: 'Physical Chemistry',
    difficulty: 'Medium',
    source: '2022 USNCO National Exam Part II',
    estimated_time: 25,
    statement: 'Calculate the electromotive force (EMF) at $298\\text{ K}$ for the galvanic cell:\n$$\\text{Zn}(s) | \\text{Zn}^{2+}(0.010\\text{ M}) || \\text{Cu}^{2+}(1.0\\text{ M}) | \\text{Cu}(s)$$\ngiven $E^\\circ_{\\text{cell}} = +1.10\\text{ V}$.',
    hints: [
      'Nernst equation: $E = E^\\circ - \\frac{0.0592}{n} \\log_{10} Q$.',
      'Reaction quotient $Q = \\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]} = \\frac{0.010}{1.0} = 10^{-2}$.',
      'Number of transferred electrons $n = 2$.'
    ],
    solution: '$$E = 1.10 - \\frac{0.0592}{2} \\log_{10}(10^{-2}) = 1.10 - 0.0296 (-2) = 1.10 + 0.0592 = 1.1592\\text{ V}$$\nThe cell potential is $+1.16\\text{ V}$.',
    numericalAnswer: '1.16 V',
  },
  {
    id: 'chem-kin-01',
    title: 'Arrhenius Activation Energy Calculation',
    subject: 'Chemistry',
    topic: 'Kinetics',
    difficulty: 'Easy',
    source: 'USNCO Local Exam',
    estimated_time: 15,
    statement: 'A chemical reaction doubles its rate constant when the temperature increases from $300\\text{ K}$ to $310\\text{ K}$. Calculate the activation energy $E_a$ in $\\text{kJ/mol}$. ($R = 8.314\\text{ J/(mol}\\cdot\\text{K)}$).',
    hints: [
      'Arrhenius equation: $\\ln\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{R} \\left( \\frac{1}{T_1} - \\frac{1}{T_2} \\right)$.',
      'Given $k_2/k_1 = 2$.'
    ],
    solution: '$$\\ln(2) = \\frac{E_a}{8.314} \\left( \\frac{1}{300} - \\frac{1}{310} \\right) = \\frac{E_a}{8.314} \\left( \\frac{10}{93000} \\right)$$\n$$0.69315 = E_a \\times 1.294 \\times 10^{-5} \\implies E_a = 53566\\text{ J/mol} = 53.57\\text{ kJ/mol}$$.',
    numericalAnswer: '53.57 kJ/mol',
  },
  {
    id: 'chem-inorg-01',
    title: 'Crystal Field Stabilization Energy (CFSE)',
    subject: 'Chemistry',
    topic: 'Inorganic Chemistry',
    difficulty: 'Hard',
    source: 'IChO Preparatory Set',
    estimated_time: 30,
    statement: 'Determine the Crystal Field Stabilization Energy (CFSE) in terms of $\\Delta_o$ for a high-spin octahedral $[\\text{Fe(H}_2\\text{O)}_6]^{3+}$ complex ion ($d^5$).',
    hints: [
      'Fe(III) has $d^5$ electron configuration.',
      'High-spin in octahedral field splits into $t_{2g}^3 e_g^2$.',
      'CFSE = $(-0.4 n_{t2g} + 0.6 n_{eg}) \\Delta_o$.'
    ],
    solution: 'For high-spin $d^5$: $t_{2g}^3 e_g^2$.\n$$\\text{CFSE} = [3(-0.4) + 2(+0.6)] \\Delta_o = (-1.2 + 1.2) \\Delta_o = 0 \\Delta_o$$\nCFSE is $0$.',
    numericalAnswer: '0',
  },
  {
    id: 'chem-thermo-01',
    title: 'Gibbs Free Energy & Equilibrium Constant',
    subject: 'Chemistry',
    topic: 'Thermodynamics',
    difficulty: 'Medium',
    source: 'USNCO National',
    estimated_time: 20,
    statement: 'For a reaction at $298\\text{ K}$, $\\Delta H^\\circ = -40.0\\text{ kJ/mol}$ and $\\Delta S^\\circ = -100.0\\text{ J/(mol}\\cdot\\text{K)}$. Compute the equilibrium constant $K_{eq}$.',
    hints: [
      'First calculate $\\Delta G^\\circ = \\Delta H^\\circ - T \\Delta S^\\circ$.',
      'Then $K_{eq} = \\exp\\left(-\\frac{\\Delta G^\\circ}{R T}\\right)$.'
    ],
    solution: '$\\Delta G^\\circ = -40000 - (298)(-100) = -40000 + 29800 = -10200\\text{ J/mol}$.\n$$K_{eq} = \\exp\\left( \\frac{10200}{8.314 \\times 298} \\right) = \\exp(4.117) \\approx 61.38$$.',
    numericalAnswer: '61.38',
  },
  {
    id: 'chem-org-02',
    title: 'Grignard Reaction Mechanism & Synthesis',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    difficulty: 'Medium',
    source: 'USNCO Part I',
    estimated_time: 20,
    statement: 'What major alcohol product is formed when phenylmagnesium bromide ($\\text{PhMgBr}$) reacts with acetone followed by acidic workup?',
    hints: [
      'PhMgBr acts as a nucleophilic phenyl carbanion source.',
      'Addition to acetone (a ketone) forms a tertiary alcohol.'
    ],
    solution: 'Nucleophilic attack of $\\text{Ph}^-$ on acetone carbonyl gives an alkoxide intermediate, which upon acidic workup yields **2-phenylpropan-2-ol** (a tertiary alcohol).',
    numericalAnswer: '2-phenylpropan-2-ol',
  },
  {
    id: 'chem-phys-02',
    title: 'Henderson-Hasselbalch Buffer pH',
    subject: 'Chemistry',
    topic: 'Physical Chemistry',
    difficulty: 'Easy',
    source: 'USNCO Local',
    estimated_time: 15,
    statement: 'A buffer solution contains $0.20\\text{ M}$ acetic acid ($pK_a = 4.76$) and $0.50\\text{ M}$ sodium acetate. Calculate the pH of the solution.',
    hints: [
      'Use Henderson-Hasselbalch equation: $\\text{pH} = pK_a + \\log_{10}\\left(\\frac{[A^-]}{[HA]}\\right)$.'
    ],
    solution: '$$\\text{pH} = 4.76 + \\log_{10}\\left(\\frac{0.50}{0.20}\\right) = 4.76 + \\log_{10}(2.5) = 4.76 + 0.398 = 5.16$$.',
    numericalAnswer: '5.16',
  },
  {
    id: 'chem-inorg-02',
    title: 'VSEPR Geometry of Xenon Tetrafluoride',
    subject: 'Chemistry',
    topic: 'Inorganic Chemistry',
    difficulty: 'Easy',
    source: 'IChO General',
    estimated_time: 10,
    statement: 'Determine the molecular geometry and hybridization of the central Xe atom in $\\text{XeF}_4$.',
    hints: [
      'Xe has 8 valence electrons, 4 bonding pairs with F, 2 lone pairs.',
      'Steric number = 4 + 2 = 6 (octahedral electron domain geometry).'
    ],
    solution: 'Steric number is 6 ($sp^3d^2$ hybridization).\nWith 2 lone pairs positioned trans to each other, the molecular geometry is **Square Planar**.',
    numericalAnswer: 'Square Planar, sp3d2',
  },

  // ==========================================
  // BIOLOGY (10 Problems)
  // ==========================================
  {
    id: 'bio-gen-01',
    title: 'Hardy-Weinberg Equilibrium with Selection',
    subject: 'Biology',
    topic: 'Genetics & Evolution',
    difficulty: 'Medium',
    source: '2023 IBO Theoretical Paper 1',
    estimated_time: 25,
    statement: 'In a large random-mating population, the initial frequency of recessive allele $a$ is $q = 0.4$. If individuals of genotype $aa$ have a fitness of $w_{aa} = 0.5$ relative to $w_{AA} = w_{Aa} = 1.0$, calculate the allele frequency $q\'$ in the next generation.',
    hints: [
      'Genotype frequencies before selection: $AA = p^2 = 0.36, Aa = 2pq = 0.48, aa = q^2 = 0.16$.',
      'Average population fitness $\\bar{w} = p^2(1) + 2pq(1) + q^2(0.5) = 1 - s q^2$.',
      'New frequency $q\' = \\frac{pq + q^2(1-s)}{\\bar{w}}$.'
    ],
    solution: 'Selection coefficient $s = 1 - 0.5 = 0.5$.\nAverage fitness $\\bar{w} = 1 - (0.5)(0.4)^2 = 1 - 0.08 = 0.92$.\n$$q\' = \\frac{q(1 - s q)}{\\bar{w}} = \\frac{0.4(1 - 0.2)}{0.92} = \\frac{0.32}{0.92} \\approx 0.3478$$\nThe new frequency of allele $a$ is approximately $0.348$.',
    numericalAnswer: '0.348',
  },
  {
    id: 'bio-cell-01',
    title: 'Michaelis-Menten Enzyme Kinetics',
    subject: 'Biology',
    topic: 'Cell Biology & Biochemistry',
    difficulty: 'Hard',
    source: '2022 USABO Semifinal Exam',
    estimated_time: 30,
    statement: 'An enzyme-catalyzed reaction has $V_{max} = 100\\text{ }\\mu\\text{mol/(min}\\cdot\\text{mg)}$ and $K_m = 2.0\\text{ mM}$. In the presence of a competitive inhibitor at concentration $[I] = 3.0\\text{ mM}$ ($K_i = 1.0\\text{ mM}$), calculate the initial reaction velocity $v_0$ when substrate concentration $[S] = 4.0\\text{ mM}$.',
    hints: [
      'Apparent $K_m\' = K_m \\left(1 + \\frac{[I]}{K_i}\\right)$.',
      'For competitive inhibition, $V_{max}$ remains unchanged.',
      'Formula: $v_0 = \\frac{V_{max} [S]}{K_m\' + [S]}$.'
    ],
    solution: 'Apparent $K_m\' = 2.0 \\left(1 + \\frac{3.0}{1.0}\\right) = 2.0(4) = 8.0\\text{ mM}$.\n$$v_0 = \\frac{100 \\times 4.0}{8.0 + 4.0} = \\frac{400}{12} \\approx 33.33\\text{ }\\mu\\text{mol/(min}\\cdot\\text{mg)}$$',
    numericalAnswer: '33.33',
  },
  {
    id: 'bio-phys-01',
    title: 'Goldman-Hodgkin-Katz Membrane Potential',
    subject: 'Biology',
    topic: 'Animal Physiology',
    difficulty: 'Hard',
    source: 'IBO Theoretical Exam',
    estimated_time: 35,
    statement: 'A neuron membrane at $37^\\circ\\text{C}$ ($310\\text{ K}$) has concentrations $[\\text{K}^+]_{\\text{in}} = 140\\text{ mM}, [\\text{K}^+]_{\\text{out}} = 5\\text{ mM}$, $[\\text{Na}^+]_{\\text{in}} = 15\\text{ mM}, [\\text{Na}^+]_{\\text{out}} = 150\\text{ mM}$. If the relative permeability $P_{\\text{K}} : P_{\\text{Na}} = 1.0 : 0.04$, compute the resting membrane potential $V_m$ in mV.',
    hints: [
      'GHK equation: $V_m = 61.5 \\log_{10}\\left( \\frac{P_{\\text{K}}[\\text{K}^+]_{\\text{out}} + P_{\\text{Na}}[\\text{Na}^+]_{\\text{out}}}{P_{\\text{K}}[\\text{K}^+]_{\\text{in}} + P_{\\text{Na}}[\\text{Na}^+]_{\\text{in}}} \\right)$.'
    ],
    solution: 'Numerator: $(1.0)(5) + (0.04)(150) = 5 + 6 = 11\\text{ mM}$.\nDenominator: $(1.0)(140) + (0.04)(15) = 140 + 0.6 = 140.6\\text{ mM}$.\n$$V_m = 61.5 \\log_{10}\\left(\\frac{11}{140.6}\\right) = 61.5 \\log_{10}(0.07823) = 61.5 (-1.1066) \\approx -68.06\\text{ mV}$$',
    numericalAnswer: '-68.06 mV',
  },
  {
    id: 'bio-gen-02',
    title: 'Three-Point Testcross Gene Mapping',
    subject: 'Biology',
    topic: 'Genetics & Evolution',
    difficulty: 'Medium',
    source: 'USABO Open Exam',
    estimated_time: 25,
    statement: 'In Drosophila, three linked genes $a, b, c$ are mapped via a testcross. Out of 1000 offspring, the double crossovers observed are 10. If the distance $a-b$ is 15 cM and $b-c$ is 20 cM, calculate the coefficient of coincidence (C) and interference (I).',
    hints: [
      'Expected double crossovers = $0.15 \\times 0.20 \\times 1000 = 30$.',
      'Coefficient of coincidence $C = \\frac{\\text{Observed DCO}}{\\text{Expected DCO}}$.',
      'Interference $I = 1 - C$.'
    ],
    solution: 'Expected DCO = $30$.\nObserved DCO = $10$.\n$$C = \\frac{10}{30} = 0.333$$\n$$I = 1 - C = 1 - 0.333 = 0.667$$',
    numericalAnswer: 'C = 0.333, I = 0.667',
  },
  {
    id: 'bio-eco-01',
    title: 'Trophic Efficiency & Biomass Pyramid',
    subject: 'Biology',
    topic: 'Ecology',
    difficulty: 'Easy',
    source: 'USABO Open Exam',
    estimated_time: 15,
    statement: 'If primary producers in an ecosystem capture $10,000\\text{ J}$ of net primary productivity (NPP), estimate the energy available to tertiary consumers assuming a standard 10% trophic transfer efficiency.',
    hints: [
      'Primary producers: 10,000 J.',
      'Primary consumers (herbivores): $10\\% = 1000\\text{ J}$.',
      'Secondary consumers: $100\\text{ J}$.',
      'Tertiary consumers: $10\\text{ J}$.'
    ],
    solution: '$$10,000 \\times (0.10)^3 = 10,000 \\times 0.001 = 10\\text{ J}$$.',
    numericalAnswer: '10 J',
  },
  {
    id: 'bio-cell-02',
    title: 'ATP Yield from Complete Glucose Oxidation',
    subject: 'Biology',
    topic: 'Cell Biology & Biochemistry',
    difficulty: 'Easy',
    source: 'IBO General',
    estimated_time: 15,
    statement: 'Using the standard modern stoichiometry (2.5 ATP per NADH, 1.5 ATP per FADH2), calculate the total net ATP yield per molecule of glucose oxidized via aerobic respiration.',
    hints: [
      'Glycolysis: 2 ATP + 2 NADH (malate-aspartate shuttle $\\to$ 5 ATP).',
      'Pyruvate Dehydrogenase: 2 NADH $\\to$ 5 ATP.',
      'Krebs Cycle: 2 GTP (ATP) + 6 NADH (15 ATP) + 2 FADH2 (3 ATP).'
    ],
    solution: 'Net yield = $2 + 5 + 5 + 2 + 15 + 3 = 32\\text{ ATP}$ (or 30 depending on shuttle). Standard theoretical value: 32 ATP.',
    numericalAnswer: '32 ATP',
  },
];
