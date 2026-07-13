# Editorial Intelligence Layer

## Purpose

The motion system does not invent Brent's voice, stories, opinions, or direct-sales philosophy. Those come from Brent's existing body of work.

The editorial intelligence layer may automatically retrieve relevant source material while preparing topics, research briefs, outlines, scripts, dialogue, examples, and scene directions.

It may recommend. It may quote internally for drafting. It may never publish autonomously.

## Canonical editorial source

Repository: `bbrysonelite-max/vault-personal`

The vault remains the source of truth. Its contents are referenced and retrieved; they are not copied wholesale into the motion-design repository.

Priority sources include:

1. Curated voice and identity documents.
2. The three books.
3. Personal stories and teaching anecdotes.
4. Opinions, frameworks, verbal frameworks, and what-not-to-say guidance.
5. Wispr Flow transcripts as the living voice and idea corpus.
6. Project notes and prior working sessions as secondary context.

## Retrieval policy

Agents may automatically search the vault for:

- relevant lived stories
- natural phrases and cadences
- direct-sales lessons
- AI observations
- objections and audience language
- examples, analogies, and opinions
- prior explanations of the same topic

Retrieval results must preserve source references so a reviewer can trace where a story, claim, phrase, or opinion came from.

## Source weighting

Use this order when sources disagree:

1. Brent's newest explicit decision.
2. Curated voice, opinion, and what-not-to-say documents.
3. The three books and curated story maps.
4. Recent Wispr transcripts.
5. Older transcripts and historical project conversations.

Wispr material is high-value evidence of natural speech, but raw dictation is not automatically a final factual source. Claims still require verification when appropriate.

## Human approval gate

Automatic retrieval is approved.

Automatic publication is forbidden.

Before a script or video is approved, Brent must be able to review:

- the proposed topic and angle
- the chosen story or anecdote
- material factual claims
- the Two Brents dialogue
- any Tiger Claw product reference
- the final call to action

Nothing retrieved from the vault bypasses this gate.

## Editorial law

The channel exists to make experienced relationship-based sellers more capable with AI.

The transformation is:

`Understand AI -> use AI practically -> build independent capability.`

The four content pillars are:

1. AI Made Understandable
2. AI for Direct Sales
3. Build It With Me
4. Tiger in the Real World

Tiger Claw is evidence and implementation when relevant. It is not forced into every lesson and the channel must never become a shameless product pitch.

## The Two Brents

- Brent Before AI represents earned experience, relationships, judgment, stories, and lessons from the world before these tools existed.
- Brent After AI represents the same person with AI as a magnifier: faster connections, greater leverage, experimentation, and expanded capability.
- Neither character is inferior.
- Neither lectures, ridicules, or looks down on the other.
- Both may be right at different moments.
- Their conversations must advance the lesson rather than exist as a comedy device.

Core idea:

> AI does not erase who you were. It magnifies what you bring with you.

## Repository boundary

`tigerclaw-primitives` owns visual and motion contracts.

The editorial/production operating system consumes those contracts and retrieves from `vault-personal`. It must not duplicate the vault or redefine the Tiger Claw visual system.

Future implementation must resolve the canonical production repository before wiring retrieval. `Youtube-system` has historical work, while consolidation into `ai-social-system/youtube` has also been proposed. Do not create another parallel source of truth.
