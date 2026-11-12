import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizePortfolio, cinematicFrame, sceneWeight } from '../src/lib/portfolio-orbit.ts';

test('chapter boundaries preserve source order within categories without losing projects', () => {
  const work = [
    { id: 'a', category: 'Websites' }, { id: 'b', category: 'Campaigns & Content' },
    { id: 'c', category: 'Websites' }, { id: 'd', category: 'Brand Identity' },
    { id: 'e', category: 'Campaigns & Content' },
  ];
  const { categories, projects } = normalizePortfolio(work);
  assert.deepEqual(projects.map(entry => entry.projectId), ['a', 'c', 'b', 'e', 'd']);
  assert.equal(new Set(projects.map(entry => entry.project)).size, work.length);
  assert.deepEqual(categories.map(({ categoryStartIndex, categoryEndIndex, count }) => [categoryStartIndex, categoryEndIndex, count]), [[0, 1, 2], [2, 3, 2], [4, 4, 1]]);
  for (const category of categories) {
    assert.equal(projects[category.categoryStartIndex].indexInCategory, 0);
    assert.equal(projects[category.categoryEndIndex].indexInCategory + 1, category.count);
    if (category.categoryStartIndex) assert.notEqual(projects[category.categoryStartIndex - 1].categoryId, category.id);
  }
  assert.equal(projects[2].project, work[1]);
});

test('depth is deterministic and reverses continuously across a project boundary', () => {
  for (const compact of [false, true]) {
    const focus = cinematicFrame(4, 4, compact, false);
    assert.equal(focus.opacity, 1);
    assert.ok(focus.transform.includes('scale(1)'));
    assert.ok(cinematicFrame(3, 4, compact, false).zIndex < focus.zIndex);
    assert.ok(cinematicFrame(5, 4, compact, false).opacity < focus.opacity);
    assert.deepEqual(cinematicFrame(4, 3.5, compact, false), cinematicFrame(4, 3.5, compact, false));
    assert.ok(cinematicFrame(4, 3.999, compact, false).opacity > .99);
    assert.ok(cinematicFrame(4, 4.001, compact, false).opacity > .99);
  }
});

test('reduced motion keeps exactly one project visible without depth transforms', () => {
  const frames = Array.from({ length: 10 }, (_, index) => cinematicFrame(index, 3.6, true, true));
  assert.deepEqual(frames.flatMap((frame, index) => frame.visible ? [index] : []), [4]);
  assert.equal(frames[4].filter, 'none');
  assert.equal(frames[4].transform, 'translate(-50%, -50%)');
});

test('the cinematic lane preserves previous and next sides without wrapping the finite sequence', () => {
  const x = frame => Number(frame.transform.match(/translate3d\(([-.\d]+)vw/)[1]);
  for (const compact of [false, true]) {
    assert.ok(x(cinematicFrame(3, 4, compact, false)) < 0);
    assert.ok(x(cinematicFrame(5, 4, compact, false)) > 0);
    assert.ok(x(cinematicFrame(2, 4, compact, false)) < x(cinematicFrame(3, 4, compact, false)));
    assert.equal(cinematicFrame(31, 0, compact, false).visible, false);
    assert.equal(cinematicFrame(0, 31, compact, false).visible, false);
  }
});

test('industry chapters preserve original work categories and project identity', () => {
  const work = [
    { id: 'site', category: 'Websites', portfolioCategory: 'Websites' },
    { id: 'clinic', category: 'Campaigns & Content', portfolioCategory: 'Health Clinics' },
    { id: 'shop', category: 'Campaigns & Content', portfolioCategory: 'E Commerce' },
    { id: 'clinic-2', category: 'Campaigns & Content', portfolioCategory: 'Health Clinics' },
  ];
  const { categories, projects } = normalizePortfolio(work);
  assert.deepEqual(categories.map(category => category.label), ['Websites', 'Health Clinics', 'E Commerce']);
  assert.deepEqual(projects.map(entry => entry.projectId), ['site', 'clinic', 'clinic-2', 'shop']);
  assert.equal(projects[1].project, work[1]);
  assert.equal(projects[1].project.category, 'Campaigns & Content');
  assert.equal(projects[2].indexInCategory, 1);
});

test('scene crossfades preserve total image weight, endpoints and reverse continuity', () => {
  for (const position of [0, .1, .49, .5, .51, .9, 1, 12.8, 13, 30.99, 31]) {
    const weights = Array.from({ length: 32 }, (_, index) => sceneWeight(index, position, false));
    assert.ok(Math.abs(weights.reduce((sum, value) => sum + value, 0) - 1) < .000001);
    assert.ok(weights.filter(value => value > 0).length <= 2);
  }
  assert.equal(sceneWeight(3, 3, false), 1);
  assert.equal(sceneWeight(4, 3, false), 0);
  assert.ok(Math.abs(sceneWeight(4, 3.499, false) - sceneWeight(4, 3.501, false)) < .004);
  assert.deepEqual([0, 1, 2].map(index => sceneWeight(index, 1.2, true)), [0, 1, 0]);
});
