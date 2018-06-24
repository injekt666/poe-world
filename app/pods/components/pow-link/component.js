import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({
  activeClass: 'active',

  didInsertElement() {
    const elementClasses = this.$().attr('class').split(' ').filter((cssClass) => cssClass.indexOf('ember') === -1);

    if (elementClasses.length === 0) return;

    this.set('activeClass', `${elementClasses[0]}--active`);
  }
});
