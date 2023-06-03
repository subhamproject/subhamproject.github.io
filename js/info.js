const getEl = (id) => document.getElementById(id)
const elementIdList = [
    'lastName',
    'firstName',
    'fullName',
    'email',
    'basicInfo',
    'linkedInId',
    'githubId',
    'pageTitle'
];

const hrefList = [
    'email',
    'linkedInId',
    'githubId'
]


const elements = elementIdList.reduce((r, e) => {
    r[e] = getEl(e);
    return r;
}, {});

const sections = {
    work: getEl('experience'),
    education: getEl('education')
}

const eduContainer = getEl('eduContainer');
const skillContainer = getEl('skillContainer');
const interestContainer = getEl('interestContainer');
const expContainer = getEl('expContainer');
const awardContainer = getEl('awardContainer');

const expTemplate = getEl('expTemplate');
const eduTemplate = getEl('eduTemplate');


const expCardList = [
    'title',
    'company',
    'experience',
    'duration'
]

for (let key of elementIdList) {
    const el = elements[key];
    const value = data[key];
    if (el && value) {
        el.innerText = value;
    }
}

for (let key of hrefList) {
    const el = elements[key];
    const value = data.href[key];
    el.setAttribute('href', value);
}

for (let card of data.experience) {
    const newNode = expTemplate.cloneNode(true);
    const mainContent = newNode.childNodes.item(1);
    const subContent = newNode.childNodes.item(3);
    const titleEl = mainContent.childNodes.item(1);
    const companyEl = mainContent.childNodes.item(3);
    const expListContainer = mainContent.childNodes.item(5);


    titleEl.innerText = card.title;
    companyEl.innerText = card.company;
    for (let work of card.experience) {
        const li = document.createElement('li');
        li.innerText = work;
        expListContainer.appendChild(li);
    }

    subContent.childNodes.item(0).innerText = card.duration;
    expContainer.appendChild(newNode);
}
expContainer.childNodes.item(3).remove();



for (let card of data.education) {
    const newNode = eduTemplate.cloneNode(true);
    const mainContent = newNode.childNodes.item(1);
    console.log(mainContent.childNodes);
    const titleEl = mainContent.childNodes.item(1);
    const aboutEl = mainContent.childNodes.item(3);
    const branchEl = mainContent.childNodes.item(5);
    const marksEl = mainContent.childNodes.item(7);

    titleEl.innerText = card.schoolName;
    aboutEl.innerText = card.about || '';
    branchEl.innerText = card.branch || '';
    marksEl.innerText = card.marks || '';
    const subContent = newNode.childNodes.item(3);
    subContent.childNodes.item(0).innerText = card.duration;
    eduContainer.appendChild(newNode);
}
eduContainer.childNodes.item(3).remove();

for (let icon of data.skillsList) {
    const newNode = document.createElement('li');
    newNode.setAttribute('class', 'list-inline-item');
    const iconEl = document.createElement('i');
    iconEl.setAttribute('class', `${icon} colored`);
    newNode.appendChild(iconEl);
    skillContainer.appendChild(newNode);
}

for (let interest of data.interests) {
    const newNode = document.createElement('li');
    newNode.innerText = interest;
    interestContainer.appendChild(newNode);
}



for (let award of data.awards) {
    const awardIcon = document.createElement('i');
    awardIcon.setAttribute('class', 'fa-li fa fa-trophy text-warning');
    const {title, href} = award;
    const newNode = document.createElement('li');
    const titleNode = document.createElement('span');
    titleNode.innerText = title;
    if (href) {
        let linkNode = document.createElement('a');
        linkNode.setAttribute('href', href);
        linkNode.setAttribute('target', '_blank');
        linkNode.appendChild(titleNode);
        newNode.appendChild(awardIcon);
        newNode.appendChild(linkNode);
    } else {
        newNode.appendChild(awardIcon);
        newNode.appendChild(titleNode);
    }
    awardContainer.appendChild(newNode);
}