# Tiger Claw Primitives

Canonical visual primitives for Tiger Claw across web, print, digital, and video.

## Current systems

- Web and interface primitives live on the default branch.
- Video brand primitives are being built on branch `agent/video-primitives-system`.
- The active architecture PR is [PR #2](https://github.com/bbrysonelite-max/tigerclaw-primitives/pull/2).

Agents working in this repository must read `AGENTS.md` before making changes.

## Video primitives status

The video system includes shared Tiger Claw brand tokens, motion tokens, supported video formats, a Remotion-based primitive library, typed component contracts, JSON manifests, a registry, galleries, and render checks.

Until PR #2 is approved and merged:

- do not recreate video primitives on the default branch
- do not copy the Tiger Claw video system into another repository as a competing source of truth
- do not merge or deploy video work without Brent's explicit approval
- use branch `agent/video-primitives-system` for all related work
