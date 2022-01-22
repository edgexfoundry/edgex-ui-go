import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MetadataService } from  '../services/metadata.service';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit {

  constructor(private metaSvc: MetadataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {}

}
