import React from 'react';
import './App.css';

/**
 * TODO: SCSS & Gulp, JSDoc, tests
 */

type ExperienceType = {
    title: string,
    logo: string,
    position: string,
    stint: string,
    details: string
}

/**
 * Array of objects typed by ExperienceType
 */
const experienceSet: ExperienceType[] = [
    {
        'title' : 'Thrive Web Designs',
        'logo' : 'thrive.png',
        'position' : 'Full Stack Developer',
        'stint' : 'Sep 2015 – Present • Boise, Idaho',
        'details' : 'Highlighted work: Ada County Idaho, IDVSA.org, Lee Pesky Learning Center, Syringa Properties, various Boise State projects.'
    },
    {
        'title' : 'Mattress Firm',
        'logo' : 'mattressfirm.png',
        'position' : 'Software Engineer (Contract)',
        'stint' : 'Mar 2020 – Jul 2020 • Remote',
        'details' : 'Enhanced CMS with components on HTML5, Liquid, SCSS, NodeJS, Webpack stack. Agile lifecycle. Onboarded replacement devs.'
    },
    {
        'title' : 'CenturyLink',
        'logo' : 'centurylink.png',
        'position' : 'Frontend Developer',
        'stint' : 'Sep 2012 – Aug 2015 • Boise, Idaho',
        'details' : 'Developed promos, retrofitted code, implemented A/B tests, support chat API interfacing. Scrum methodology. Onboarded offshore devs.'
    },
    {
        'title' : 'ShoutStage (now Vinyl)',
        'logo' : 'shoutstage.png',
        'position' : 'Software Engineer',
        'stint' : 'Mar 2012 – Aug 2012 • Boise, Idaho',
        'details' : 'Cutting edge NodeJS and MongoDB work to build consolidated email and chat platform. Scrum methodology.'
    },
    {
        'title' : 'UpTop Corp',
        'logo' : 'uptop.png',
        'position' : 'Software Engineer',
        'stint' : 'Jul 2006 – Feb 2012 • Boise, Idaho',
        'details' : 'Large scale projects with CenturyLink. Interactive Google Maps applications (eg store locator). Various international projects.'
    }
];

const volunteer: ExperienceType[] = [
    {
        'title' : 'American Red Cross',
        'logo': 'redcross.png',
        'position': 'Blood Donor',
        'stint': '',
        'details': 'I donate blood as often as eligible. As of Dec 2020 I have given over 2 liters of blood.'
    },
    {
        'title' : 'GitHub',
        'logo': 'github.png',
        'position': 'Open Source Contributor',
        'stint': '',
        'details': 'Reported issues and contributed code through pull requests.'
    }
];

const education: ExperienceType = {
    'title' : 'College of Idaho',
    'logo': 'cofi.png',
    'position': 'Bachelors • Mathematics and Computer Science',
    'stint': '2002 – 2006 • Caldwell, Idaho',
    'details': 'Tech committee. Outdoor program. P/T IT employee.'
};

const skillSet: { [key: string]: string[] } = {
    'pro': ['HTML5', 'CSS3 & SCSS', 'JS', 'ES6', 'React', 'TypeScript', 'PHP7', 'OOP', 'REST & SOAP', 'oAuth', 'MySQL', 'Linux & Apache', 'WordPress', 'WCAG', 'Photography'],
    'new': ['NodeJS', 'MongoDB', 'Python'],
    'tools': ['Docker', 'Cloudways', 'Adobe DTM', 'GTM', 'Git', 'Gulp', 'JetBrains', 'Confluence', 'Zeplin', 'Photoshop']
};

const bio: { [key: string]: string | object } = {
    'title': <h1><em>Andrew</em> <em>Hahn</em></h1>,
    'intro': 'Professional web developer since 2004 • Developed scores of projects from design to production • DIYer, adventurer, and fatherer • Sourdough baker since before it was pandemic cool',
    'logo': '',
    'address': <p>Boise, Idaho<br/>208ha<span className={'no-spam'}>asdf</span>hn&#64;gmail&#46;com<br/>208-283-5298</p>,
    'slogan': <p>Endeavor with our <strong>heads together</strong>.</p>
};

/**
 *
 * @param {object} props
 * @constructor
 */
function ResumeItem(props: { experience: ExperienceType; })
{
    const experienceImage = require(`./images/${props.experience.logo}`).default;

    return(
        <section>
            <div className="company-logo">
                <img src={experienceImage} alt={props.experience.title} />
            </div>
            <div className="background-section">
                <h3>{props.experience.position}</h3>
                <p>{props.experience.title}</p>
                <h4>{props.experience.stint}</h4>
            </div>
            <div className="work-details">
                <p>{props.experience.details}</p>
            </div>
        </section>
    );
}

/**
 * ResumeMain
 * Display bio, iterate over the array of experience objects, output education.
 *
 * @return JSX
 */
function ResumeMain()
{
    return(
        <div className={'grid-area-experience'}>
            { bio.title }
            <section><p>{bio.intro}</p><p>View Source: <a href="https://github.com/hahn208/resume-react" target="_blank">github.com/hahn208/resume-react</a></p></section>
            <h2><em>Experience</em></h2>
            { experienceSet.map(experienceItem => (<ResumeItem experience={experienceItem}/>)) }
            <h2><em>Education</em></h2>
            <ResumeItem experience={education}/>
        </div>
    );
}

/**
 * Sidebar
 * Build skillset html. Display profile, skills, volunteer experience, and little bio.
 *
 * @return JSX
 */
function Sidebar()
{
    /**
     * Build an array of list items containing skills
     *
     * @param set
     */
    let skillsOutput = (set: Array<string>) => (
        set.map(
            (item: string, index: number) => {
                return <li>{item}</li>;
            }
        )
    );

    return (
        <div className={'grid-area-sidebar'}>
            <img src={require('./images/profile.jpg').default} alt="Andrew Hahn with son" style={{'width': '100%'}}/>
            <h5>Professional Skills</h5>
            <ul className='skills-list'>
                {skillsOutput(skillSet.pro)}
            </ul>
            <h5>Novice Skills</h5>
            <ul className='skills-list'>
                {skillsOutput(skillSet.new)}
            </ul>
            <h5>Professional Tools</h5>
            <ul className='skills-list'>
                {skillsOutput(skillSet.tools)}
            </ul>
            <h2><em>Volunteer</em> <em>Experience</em></h2>
            { volunteer.map(experienceItem => (<ResumeItem experience={experienceItem}/>)) }
            <section>
                <img src={require('./images/ah.png').default} alt={'AH'} id={'AH'}/>
                {bio.address}
                {bio.slogan}
            </section>
        </div>
    );
}

function App()
{
  return (
    <div className="App">
      <Sidebar/>
      <ResumeMain/>
    </div>
  );
}

export default App;
