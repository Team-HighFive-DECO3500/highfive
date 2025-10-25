# Research Process & Findings

## Research Overview

We began by framing our challenge around healthy eating habits among students in shared accommodation. Our research combined semi-structured interviews with three students, observations drawn from their past cooking experiences and shared kitchen environments, and a literature review examining how digital health communication, particularly Australian healthy eating blogs, functions within mobile health contexts. This mixed-methods approach follows the DECO3500 expectation to ground prototypes in both academic and user-centred data.

---

## Scope & Methods

**Literature Review:** We reviewed recent studies on Australian food environments, healthy-eating communication, and consumer nutrition behaviours [R1][R2][R3][R4][R5][R6].

**Semi-Structured Interviews:** We conducted interviews with three students (aged 18–25) living in shared housing, exploring cooking frequency, health perceptions, social cooking dynamics, time constraints, and technology needs.

**Observations:** We reflected on our own shared kitchen experiences, noting bottlenecks, environment constraints, fairness issues, and food waste patterns.

**Analysis:** We synthesised findings through affinity diagramming, which revealed three critical problem clusters: time, budget, and coordination pressures; knowledge gaps and environmental barriers; and motivation challenges like stress and decision fatigue.

---

## Participants

**Age:** 18–25 years old  
**Context:** University students living in shared housing  
**Cooking patterns:** Cooked a few times per week, preferred meals ≤30 minutes, aimed for "healthy and tasty" but often defaulted to convenience  
**Recipe sources:** YouTube and peers  
**Collaboration:** Rare without coordination, but described as "fun" when it happened  

### Individual Participant Profiles

**Participant 1**
- Cooks every alternate day, prioritises health and taste
- Prefers meals under 30 minutes; time is the biggest irritation
- Motivated by high cost of eating out and concerns about ingredient quality
- Hasn't cooked with others much; one mixed experience where they did most of the work
- Wants an app with quick, healthy recipes and diet-specific communities (vegan, non-veg)

**Participant 2**
- Lives in shared accommodation; cooks 2 to 4 times a week with friends
- Limited cooking skills but enjoys collaborative cooking (task distribution makes it fun and efficient)
- Prioritises nutritious, protein-rich meals (eats only 1 to 2 times a day)
- Experiences decision fatigue: "we're very confused about the thing that we're gonna make"
- Wants an app that suggests nutrients and routines for their diet

**Participant 3**
- Cooks almost daily; experienced since high school
- Vegetarian, prefers oil-free, fresh, non-fried food cooked in around 30 minutes
- Shares food socially (weekly paratha for housemates)
- Main pain point: post-cooking cleanup
- Uses YouTube for recipes but wants better ingredient education (unfamiliar ingredients, health benefits, usage methods)

---

## Key Themes & Findings

Across all interviews, consistent patterns emerged. Students wanted meals in under 30 minutes, valued health and taste but were constrained by budget, found cooking together rewarding when coordination was simple, and felt frustrated by decision-making around what to cook and post-cooking cleanup.

| **Theme** | **User Need/Challenge** | **Design Implication** |
|-----------|-------------------------|------------------------|
| **Time & Routine** | Meals wanted in less than 30 minutes; long prep and cleanup irritates; inconsistent eating schedules; fatigue often led to skipping cooking | Prioritise quick recipes; include cleanup time estimates; support flexible meal timing |
| **Budget** | Cost-conscious; eating out seen as expensive; want value without sacrificing nutrition; solo grocery shopping caused waste | Show cost comparisons vs eating out; budget-friendly filters; shared expense splitting |
| **Coordination / Decision Fatigue** | "What should we cook?" paralysis; unclear task distribution when cooking together | Provide meal suggestion engine; voting system; automated duty distribution (prep, cook, clean) |
| **Motivation / Social** | Cooking together is rewarding but hard to organise; loneliness when cooking alone; cooking only worked when duties and timing were made clear | Build household-centric features; social recipe sharing; community groups by diet type |
| **Knowledge Gaps** | Unfamiliar ingredients; lack of cooking skills; nutritional confusion from diet culture | Embed just-in-time ingredient education; progressive technique tips; clear nutritional info |
| **Post-Cooking Burden** | Cleanup frustration; ingredient waste; lack of leftover planning | Integrate cleanup coordination; shared inventory tracking; leftover recipe suggestions |
| **Health & Taste** | Important values but often overridden by convenience at the last moment | Make healthy options visible and quick to act on at decision time |

### Additional Social Coordination Insights

When asked about handling shared responsibilities:

**Participant 1:** "Honestly, I just end up doing it myself most of the time. It's easier than having an awkward conversation, but it does build up resentment after a while. I've started leaving passive-aggressive notes on the fridge, which probably isn't helping."

**Participant 2:** "It depends on who it is. With some flatmates I feel comfortable saying something, but with others I just bite my tongue because I don't want to create drama. It's frustrating because then nothing changes."

When asked about coordination tools:

**Participant 1:** "We made a roster in week one that lasted maybe three weeks. Now it's just stuck on the fridge as decoration. Everyone had good intentions, but life got busy and no one really follows it anymore."

**Participant 2:** "Yeah, we use a WhatsApp group or Instagram for everything—grocery runs, whose turn it is to clean, reminding each other about bins. It works pretty well because we're all on our phones anyway. Not perfect, but better than nothing."

---

## Observations of Shared Kitchens

**Bottlenecks:** Peak congestion at lunch and dinner times when multiple housemates try to cook simultaneously.

**Environment:** Limited space, mixed-quality tools, and inadequate storage constrain cooking activities.

**Fairness:** Unclear cleaning and shopping rotations led to tension between housemates.

**Food waste:** Leftovers and ingredients often discarded due to lack of planning or coordination.

A lightweight way to plan meals, divide duties, and reuse leftovers would ease friction and reduce waste.

---

## Literature Insights

Our review of Australian healthy eating blogs written by dietitians and nutritionists found that successful digital health communication combines practical advice like meal planning, recipes, and everyday tips with positive, relatable messaging and personal stories [R5]. These blogs thrive on mobile platforms and social media, creating two-way conversations through comments and sharing.

Australian research shows cost and visibility strongly shape food choices [R1][R2][R3]. Healthy options are often less visible or harder to act on quickly. Guidance can feel abstract, but narrative formats improve relatability. Evidence suggests people respond best to simple, actionable prompts at decision time rather than heavy tracking [R4][R6].

**Key takeaway:** Embed evidence-based nutrition within engaging, social, mobile-first experiences that nudge healthy habits through community interaction rather than prescriptive tracking.

---

## Synthesis & Problem Statement

These insights shaped our problem statement:

**Students in shared living struggle to maintain consistent healthy eating habits due to time constraints, decision fatigue, limited cooking knowledge, and lack of structured social support, leading them to rely on expensive and less nutritious eating-out options despite their health-conscious intentions.**

This behavioral contradiction—wanting health but defaulting to convenience—became our core design challenge. Decisions often happen in motion (on the way home, in a queue, or when housemates overlap). A phone-first tool with visible coordination and lightweight reminders can reduce decision fatigue, show housemate availability in real time, and split roles fairly.

---

## Design Opportunities

From this foundation, we identified four design opportunities, positioning our solution uniquely at the intersection of social features, cooking focus, and coordination support for shared living contexts:

**1. Social Meal Coordination Platform (High Priority)**  
Tackles decision fatigue and coordination through shared meal planning, group voting, duty distribution, and cost splitting.

**2. Quick Nutrition-Focused Recipe Engine (High Priority)**  
Provides 30-minute recipes with embedded ingredient education and dietary customisation (vegetarian, protein-rich).

**3. Student Community Recipe Sharing (Medium Priority)**  
Connects students across dietary communities (vegan, cultural cuisines) for recipe sharing, challenges, and success stories.

**4. Smart Kitchen Management (Medium Priority)**  
Handles the less exciting essentials: cleanup coordination, shared ingredient inventory, leftover suggestions, and kitchen duty rotation.

### Design Principles

- Keep actions short and clear at the point of choice
- Make group coordination the default, not an optional extra
- Support health without framing it as medical advice
- Respect budgets and show savings where possible
- Reduce mess with simple duty rotation and leftover use

---

## References

[R1] BMC Public Health. (2022). Towards healthier and more sustainable diets in the Australian context: Comparison of current diets with the Australian Dietary Guidelines and the EAT-Lancet Planetary Health Diet.  
https://link.springer.com/article/10.1186/s12889-022-14252-z

[R2] Obesity Science & Practice. (n.d.). What is known about consumer nutrition environments in Australia? A scoping review of the literature.  
https://onlinelibrary.wiley.com/doi/full/10.1002/osp4.275

[R3] BMC Public Health. (2016). Testing the price and affordability of healthy and current (unhealthy) diets and the potential impacts of policy change in Australia.  
https://link.springer.com/article/10.1186/s12889-016-2996-y

[R4] Public Health Nutrition. (2013). Towards healthy and sustainable food consumption: An Australian case study.  
https://www.cambridge.org/core/journals/public-health-nutrition/article/towards-healthy-and-sustainable-food-consumption-an-australian-case-study/9A87589C420AF97526FD398763C64511

[R5] BMC Public Health. (2019). Reframing healthy food choices: A content analysis of Australian healthy-eating blogs.  
https://link.springer.com/article/10.1186/s12889-019-8064-7

[R6] Annals of the New York Academy of Sciences. (n.d.). Consumer food environments: Evidence and implications.  
https://www.semanticscholar.org/paper/221d1550f7928b77c5aa4f573ae0bc76965af7e5
