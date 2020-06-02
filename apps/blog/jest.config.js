module.exports = {
  name: 'blog',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/blog',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
