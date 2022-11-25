import ghpages from "gh-pages";

ghpages.publish('build', {
  branch: 'master',
  dotfiles: true,
  repo: 'git@github.com:rahelest/rahelest.github.io.git'
}, function (err) {
  if (err) {
    console.error(err)
  } else {
    console.log('Done!')
  }
});
