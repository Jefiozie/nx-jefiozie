module.exports = {
  name: 'blog',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/blog',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
