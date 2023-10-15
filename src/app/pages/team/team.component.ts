import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent {
  constructor(private meta: Meta, private title: Title) {
    this.meta.addTag({
      name: 'title',
      content: 'Team | Devfest Siliguri 2023',
    });
    this.title.setTitle('Team | Devfest Siliguri 2023');
  }

  organizersDetails = [
    {
      timestamp: '2023-10-13T16:00:12.970Z',
      yourName: 'Ananta',
      designation: 'Volunteer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/ananta-singh-652923247',
      yourTwitterUrl:
        'https://x.com/AnantaS30589273?t=YzMWEO1sgLaqRZBb2kd_rQ&s=09',
      yourGithubUrl: 'https://github.com/Ananta-Singh',
      provideYourPicture:
        'https://drive.google.com/open?id=1ZHEdvrCVinTG7lZxBf3K2PHHMmlKUC21',
    },
    {
      timestamp: '2023-10-13T16:01:03.668Z',
      yourName: 'Sankalan Dasgupta ',
      designation: 'Volunteer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/sankalan-dasgupta',
      yourTwitterUrl: 'https://twitter.com/Sankalan47',
      yourGithubUrl: 'https://github.com/Sankalan47',
      provideYourPicture:
        'https://drive.google.com/open?id=1LRPiU-7bruYCl_WYxJoH2wi5RttxDFZg',
    },
    {
      timestamp: '2023-10-13T16:05:00.604Z',
      yourName: 'Priyam Biswas ',
      designation: 'Volunteer',
      yourLinkedinUrl:
        'https://www.linkedin.com/in/priyam-biswas-24ba77268?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      yourTwitterUrl:
        'https://x.com/PriyamB75602529?t=gYAQdet_AcYfyoYV0ueOOQ&s=09',
      yourGithubUrl: 'https://github.com/Priyam-Biswas-2000',
      provideYourPicture:
        'https://drive.google.com/open?id=1n58V9EGFfzE7AByjU1d4XJ_Flau_ZkVt',
    },
    {
      timestamp: '2023-10-13T16:05:22.852Z',
      yourName: 'Diya Sarkar ',
      designation: 'Volunteer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/diya-sarkar-53678a205',
      yourTwitterUrl: 'https://twitter.com/ADiya1802',
      yourGithubUrl: 'https://github.com/adiya13',
      provideYourPicture:
        'https://drive.google.com/open?id=1wS2XC-fIxTvZo0MnTHkV-gRYErF9in7G',
    },
    {
      timestamp: '2023-10-13T16:09:26.879Z',
      yourName: 'Sayantani Sarkar',
      designation: 'Volunteer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/sayantanisarkarofficial/',
      yourTwitterUrl: 'https://twitter.com/Sayanta99188174',
      yourGithubUrl: 'https://github.com/sarkar-codes',
      provideYourPicture:
        'https://drive.google.com/open?id=1pQLyiRMYwQMcyM7Y_6CHMPIxlD-WbhYE',
    },
    {
      timestamp: '2023-10-13T16:10:55.368Z',
      yourName: 'Shreya Roy',
      designation: 'Volunteer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/shreya-roy-3147881b7/',
      yourTwitterUrl: 'https://twitter.com/ShreyaR19458856',
      yourGithubUrl: 'https://github.com/Shreya010tech',
      provideYourPicture:
        'https://drive.google.com/open?id=1VuZxYlB3GBSX0stMab1yM-PKyjfsF1wL',
    },
    {
      timestamp: '2023-10-13T16:11:12.000Z',
      yourName: 'Drishya Chettri ',
      designation: 'Volunteer',
      yourLinkedinUrl:
        'https://www.linkedin.com/in/digchan-xetry-b128b620b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      yourTwitterUrl: 'I d have ',
      yourGithubUrl: 'https://github.com/itsdrishyach',
      provideYourPicture:
        'https://drive.google.com/open?id=14gSfjRjhHoUG9fNOj8cXEqodpxISWQso',
    },
    {
      timestamp: '2023-10-13T16:19:55.195Z',
      yourName: 'Suvaditya Gupta',
      designation: 'Volunteer',
      yourLinkedinUrl:
        'https://www.linkedin.com/in/suvaditya-gupta-6a5286194?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      yourTwitterUrl: 'https://x.com/suv_aditya?t=y3-Dd91EOJnt6KIPfmhyeQ&s=09',
      yourGithubUrl: 'https://github.com/suvadityagupta',
      provideYourPicture:
        'https://drive.google.com/open?id=1UqPEPErQcwpvTG48v7Z5WOoDk0GEQmu8',
    },
    {
      timestamp: '2023-10-13T16:27:01.286Z',
      yourName: 'Debajyoti Sarkar',
      designation: 'Volunteer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/debajyoti-sarkar-oos',
      yourTwitterUrl: 'Twitter.com/debuisalive',
      yourGithubUrl: 'https://github.com/debajyotisarkarhome',
      provideYourPicture:
        'https://drive.google.com/open?id=1aAaHgHy79N7oreEXxsGB5ZL7thRveJKb',
    },
    {
      timestamp: '2023-10-13T16:28:06.109Z',
      yourName: 'Hrishab Biswas',
      designation: 'Volunteer',
      yourLinkedinUrl:
        'https://www.linkedin.com/in/hrishab-biswas-799378254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ',
      yourTwitterUrl: 'https://x.com/Hrxhab23?t=v58otAkZDM_e1mLDsC7bkw&s=08 ',
      yourGithubUrl: 'https://github.com/Hrishab69',
      provideYourPicture:
        'https://drive.google.com/open?id=1mjhW-dsTFfe2IS97y5rqALgnXxOD6DNs',
    },
    {
      timestamp: '2023-10-13T16:29:39.563Z',
      yourName: 'Mayuree Das',
      designation: 'Volunteer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/mayuree-das-88ba20200/',
      yourTwitterUrl: 'https://twitter.com/MayureeDas777',
      yourGithubUrl: 'https://github.com/MayureeDas',
      provideYourPicture:
        'https://drive.google.com/open?id=1CiuAVryOn-U09iK6aYddz-AEGul6O0VN',
    },
    {
      timestamp: '2023-10-13T16:37:19.175Z',
      yourName: 'Priyangshu Sarkar',
      designation: 'Volunteer',
      yourLinkedinUrl:
        'https://www.linkedin.com/in/priyangshu-sarkar-68b968200',
      yourTwitterUrl: 'N/A',
      yourGithubUrl: 'https://github.com/Priyangshu1711',
      provideYourPicture:
        'https://drive.google.com/open?id=1HVvJM6Mg5pzCJoBYt6PkKDWLt1mYYddS',
    },
    {
      timestamp: '2023-10-13T17:21:37.806Z',
      yourName: 'Aritra Saha',
      designation: 'Volunteer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/aritra-saha-0418a41b1',
      yourTwitterUrl: 'https://twitter.com/Aritra047',
      yourGithubUrl: 'https://github.com/aritrasahacodes',
      provideYourPicture:
        'https://drive.google.com/open?id=1VrMFjznme-EmGS81Tam2JQSAAlCc1a6f',
    },
    {
      timestamp: '2023-10-13T17:58:41.106Z',
      yourName: 'Swarup Das',
      designation: 'Volunteer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/swarup-das-8bb857200/',
      yourTwitterUrl: 'https://twitter.com/ronyzgameshow',
      yourGithubUrl: 'https://github.com/Das-Swarup',
      provideYourPicture:
        'https://drive.google.com/open?id=19eEvevZ3P0MQJMwOIfALIhIF9GSA6Qkn',
    },
    {
      timestamp: '2023-10-14T18:48:05.431Z',
      yourName: 'Aniruddha Das',
      designation: 'Volunteer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/aniruddhadas852',
      yourTwitterUrl: 'https://x.com/isthatAniruddha',
      yourGithubUrl: 'https://github.com/OctoplusNinja',
      provideYourPicture:
        'https://drive.google.com/open?id=1DxHqPp48AIRioLnbs5KpyiWnTKPHlQu2',
    },
    {
      timestamp: '2023-10-14T19:33:59.658Z',
      yourName: 'Debajit Mallick',
      designation: 'Organizer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/debajit-mallick/',
      yourTwitterUrl: 'https://twitter.com/MallickDebajit/',
      yourGithubUrl: 'https://github.com/debajit13/',
      provideYourPicture:
        'https://drive.google.com/open?id=1xEHRHK-0OfLzbP7qYOGGdjwMf_-ZphOZ',
    },
    {
      timestamp: '2023-10-14T19:39:43.926Z',
      yourName: 'Subhranil Sarkar',
      designation: 'Organizer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/subhranil-sarkar/',
      yourTwitterUrl: 'https://twitter.com/subhranilsarkr',
      yourGithubUrl: 'NA',
      provideYourPicture:
        'https://drive.google.com/open?id=1GhYIp9beitbpHMaGImt4LTFY54f6_w7O',
    },
    {
      timestamp: '2023-10-14T19:47:06.909Z',
      yourName: 'Sourav Das',
      designation: 'Organizer',
      yourLinkedinUrl: 'https://www.linkedin.com/in/srv09/',
      yourTwitterUrl: 'https://x.com/Srv0901?t=J55GhTy9g7zFF5r7UzvHqA&s=09',
      yourGithubUrl: 'https://github.com/srv09',
      provideYourPicture:
        'https://drive.google.com/open?id=1pykGP9d12dzTdlvvQhPPi6urKOtp7-TA',
    },
    {
      timestamp: '2023-10-14T19:48:03.047Z',
      yourName: 'Srishti Majumder ',
      designation: 'Organizer',
      yourLinkedinUrl:
        'https://www.linkedin.com/in/srishti-majumder?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      yourTwitterUrl:
        'https://x.com/MajumderSrishti?t=RjodYdzpA_RxURtT-CUFsA&s=09',
      yourGithubUrl: 'https://github.com/Srishtihere',
      provideYourPicture:
        'https://drive.google.com/open?id=16M_enBFcpPCjRCMN5wwZHkFVID4kLOZL',
    },
  ];

  organizers = this.organizersDetails.filter(
    (member) => member.designation === 'Organizer'
  );
  volunteers = this.organizersDetails.filter(
    (member) => member.designation === 'Volunteer'
  );
}
