/*******************************************************************************
 * Copyright © 2017-2018 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 *
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/
(function init(){
  db=db.getSiblingDB('admin');
  try {
    db.createUser({
      user  : 'root',
      pwd   : 'root',
      roles : [
        {
          role : 'userAdminAnyDatabase',
          db   : 'admin'
        }
      ]
    });
  } catch(e){
    return;
  }

  db.auth('root','root');
  db=db.getSiblingDB('edgex-ui-go');
  db.createUser({
    user  : 'su',
    pwd   : 'su',
    roles  : [
      {
        role : 'readWrite',
        db   : 'edgex-ui-go'
      }
    ]
  });

  db.auth('su','su');
  db.createCollection('user');
  db.createCollection('gateway');
  ts = Date.now();
  db.user.insertOne({
    name     : 'admin',
    password : 'admin',
    created  : ts,
    modified : ts
  });
})();
